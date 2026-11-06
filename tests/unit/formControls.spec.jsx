import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema } from '../../src/lib/schemas.js';
import { FormField, Input, ConsentCheckbox } from '../../src/components/common/FormControls.jsx';

function Probe({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: '', email: '', phone: '', message: '', consent: false, company: '' },
  });
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      <FormField id="probe-name" label="Full name" required error={form.formState.errors.name}>
        <Input id="probe-name" autoComplete="name" {...form.register('name')} placeholder="Your name" />
      </FormField>
      <FormField id="probe-email" label="Email" required error={form.formState.errors.email}>
        <Input id="probe-email" type="email" autoComplete="email" {...form.register('email')} placeholder="you@example.com" />
      </FormField>
      <FormField id="probe-phone" label="Phone" error={form.formState.errors.phone}>
        <Input id="probe-phone" type="tel" autoComplete="tel" {...form.register('phone')} placeholder="+1 555 123 4567" />
      </FormField>
      <FormField id="probe-message" label="Message" required error={form.formState.errors.message}>
        <Input id="probe-message" {...form.register('message')} placeholder="How can we help?" />
      </FormField>
      <div>
        <ConsentCheckbox
          id="probe-consent"
          label="I consent"
          error={form.formState.errors.consent}
          register={form.register('consent')}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

describe('RHF + forwardRef wire-up', () => {
  it('captures values through FormField<Input> wrapping and ConsentCheckbox', async () => {
    const user = userEvent.setup();
    let submitted = null;
    render(<Probe onSubmit={(values) => (submitted = values)} />);

    await user.type(screen.getByPlaceholderText('Your name'), 'Ada Lovelace');
    await user.type(screen.getByPlaceholderText('you@example.com'), 'ada@example.com');
    await user.type(screen.getByPlaceholderText('+1 555 123 4567'), '555-0100');
    await user.type(screen.getByPlaceholderText('How can we help?'), 'Interested in a viewing.');

    // Validation should fail: consent not yet checked.
    await user.click(screen.getByRole('button', { name: /submit/i }));
    expect(submitted).toBe(null);
    expect(screen.getByText('Please consent to be contacted.')).toBeInTheDocument();

    await user.click(screen.getByLabelText(/I consent/i));
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(submitted).not.toBe(null);
    expect(submitted.name).toBe('Ada Lovelace');
    expect(submitted.email).toBe('ada@example.com');
    expect(submitted.consent).toBe(true);
  });
});
