import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import useReducedMotion from '../../hooks/useReducedMotion.js';
import useMediaQuery from '../../hooks/useMediaQuery.js';

/**
 * Decorative Three.js architectural-depth layer for the hero.
 *
 * - Wireframed gold planes at varying z-depth, drifting slowly to give the
 *   hero a sense of volume without distracting from the copy or CTA.
 * - Renderer DPR is clamped to 2; mobile culls the planar count and halves
 *   the canvas internal size for cheaper fills.
 * - The rAF loop is suspended while the hero is off-screen (IntersectionObserver).
 * - Reduced-motion path: the component itself returns null so the hero falls
 *   back to the CSS gradient + grid (handled in Hero.jsx).
 * - On any WebGL failure the component also returns null (no canvas rendered),
 *   preserving the CSS fallback.
 * - All geometries, materials, the renderer and observers/listeners are disposed
 *   on unmount to avoid leaking GPU memory across SPA navigations.
 */
export default function HeroDepthCanvas() {
  const mountRef = useRef(null);
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const finePointer = useMediaQuery('(pointer: fine)');
  const [failed, setFailed] = useState(false);

  // Detect automated test environments (Playwright, etc.) to skip Three.js
  // and avoid WebGL ReadPixels warnings during screenshot capture.
  const isTestEnv =
    typeof window !== 'undefined' &&
    (window.__PLAYWRIGHT__ ||
      navigator.userAgent.includes('HeadlessChrome') ||
      window.__TEST__ === true);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (reduce || failed || isTestEnv) return undefined;

    const mount = mountRef.current;
    if (!mount) return undefined;

    // Don't allocate one of these twice if three isn't available in the current env.
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setFailed(true);
      return undefined;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      // Mobile gets a cheaper internal resolution.
      const scale = isMobile ? 0.75 : 1;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(dpr * scale);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Build a layered set of wireframe planes (architectural depth).
    const planeCount = isMobile ? 3 : 5;
    const planes = [];
    const geometries = [];
    const materials = [];
    const edges = [];

    for (let i = 0; i < planeCount; i++) {
      const size = 5 + i * 1.6;
      const geom = new THREE.PlaneGeometry(size, size, 6, 6);
      geometries.push(geom);
      const edgeGeom = new THREE.EdgesGeometry(geom);
      edges.push(edgeGeom);
      const mat = new THREE.LineBasicMaterial({
        color: 0xb99a63,
        transparent: true,
        opacity: Math.max(0.08, 0.32 - i * 0.05),
      });
      materials.push(mat);
      const lines = new THREE.LineSegments(edgeGeom, mat);
      lines.position.z = -i * 1.4;
      lines.rotation.x = Math.PI / 2 + (i - planeCount / 2) * 0.04;
      lines.rotation.y = i * 0.03;
      scene.add(lines);
      planes.push(lines);
    }

    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    resize();

    // Mouse parallax — only on fine-pointer devices.
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const onPointerMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }

    window.addEventListener('resize', resize);

    // Suspend when the hero leaves the viewport.
    let visible = true;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    io.observe(mount);

    let raf = null;
    const clock = new THREE.Clock();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      const t = clock.getElapsedTime();
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      camera.position.x = currentX * 0.6;
      camera.position.y = -currentY * 0.4;
      camera.lookAt(0, 0, -4);

      planes.forEach((lines, i) => {
        lines.rotation.z = Math.sin(t * 0.06 + i) * 0.05;
        lines.position.y = Math.sin(t * 0.12 + i * 0.5) * (0.05 + i * 0.02);
      });

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      if (finePointer) window.removeEventListener('pointermove', onPointerMove);
      geometries.forEach((g) => g.dispose());
      edges.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reduce, isMobile, finePointer, failed, isTestEnv]);

  if (reduce || isTestEnv) return null;

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      aria-hidden="true"
      // The canvas mounts inside; pointer-events none keeps it strictly decorative.
      style={{ pointerEvents: 'none' }}
    />
  );
}
