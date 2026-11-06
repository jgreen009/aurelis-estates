import { useState, useEffect, useRef } from 'react';

const sectionIds = [
  'home',
  'showcase',
  'properties',
  'cinematic',
  'services',
  'neighborhoods',
  'map',
  'calculator',
  'expertise',
  'testimonials',
  'contact',
];

export default function useActiveSection() {
  const [active, setActive] = useState('home');
  const observer = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.15, 0.35, 0.6, 1] }
    );

    elements.forEach((el) => obs.observe(el));
    observer.current = obs;
    return () => {
      obs.disconnect();
      observer.current = null;
    };
  }, []);

  return active;
}
