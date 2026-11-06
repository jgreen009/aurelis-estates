import { describe, it, expect } from 'vitest';
import { submitForm } from '../../src/lib/submitForm.js';

describe('submitForm local fallback', () => {
  it('simulates a successful submission when no endpoint is configured', async () => {
    const result = await submitForm({
      kind: 'inquiry',
      name: 'Test Client',
      email: 'test@example.com',
      message: 'A few sentences to ensure length validation passes through here.',
      consent: true,
    });
    expect(result.success).toBe(true);
    expect(result.mode).toBe('simulated');
    expect(result.reference).toMatch(/^LOCAL-/);
  });

  it('returns a failure for an invalid payload', async () => {
    const result = await submitForm(null);
    expect(result.success).toBe(false);
    expect(result.reason).toBe('invalid-payload');
  });

  it('still simulates a successful submission for a structurally empty object (schema validation is the form layer\'s responsibility)', async () => {
    const result = await submitForm({});
    expect(result.success).toBe(true);
    expect(result.mode).toBe('simulated');
  });
});
