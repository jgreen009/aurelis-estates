import { hasFormEndpoint, contactFormEndpoint } from './env.js';

/**
 * Submit a contact form payload.
 *
 * Production behavior: POST to VITE_CONTACT_FORM_ENDPOINT.
 * Fallback (no endpoint configured): resolve locally after a short delay
 * to model realistic network latency. The fallback is clearly marked in
 * the returned payload so the UI can disclose it to the user without
 * implying a remote delivery occurred.
 *
 * Never throws on the fallback path. On the remote path, network errors
 * are surfaced via `success: false` rather than throwing.
 *
 * @param {object} payload - form values
 * @param {object} [options]
 * @param {AbortSignal} [options.signal]
 */
export async function submitForm(payload, { signal } = {}) {
  if (!payload || typeof payload !== 'object') {
    return { success: false, reason: 'invalid-payload', message: 'No data supplied.' };
  }

  if (!hasFormEndpoint) {
    // Local fallback simulation. Clearly isolated.
    await new Promise((resolve) => setTimeout(resolve, 850));
    return {
      success: true,
      mode: 'simulated',
      message: 'Received locally. Enable VITE_CONTACT_FORM_ENDPOINT to forward to a service.',
      reference: `LOCAL-${Date.now().toString(36).toUpperCase()}`,
    };
  }

  try {
    const response = await fetch(contactFormEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });

    if (!response.ok) {
      return {
        success: false,
        reason: 'http-error',
        message: `The submission could not be completed (HTTP ${response.status}).`,
      };
    }

    let data = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await response.json().catch(() => null);
    }

    return {
      success: true,
      mode: 'remote',
      message: 'Submission received.',
      data,
    };
  } catch (err) {
    if (err && err.name === 'AbortError') {
      return { success: false, reason: 'aborted', message: 'Submission cancelled.' };
    }
    return {
      success: false,
      reason: 'network-error',
      message: 'A network issue interrupted the submission. Please try again.',
    };
  }
}
