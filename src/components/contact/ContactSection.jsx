import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from '../common/SectionHeading.jsx';
import AccessibleTabs from '../common/AccessibleTabs.jsx';
import Button from '../common/Button.jsx';
import {
  FormField,
  Input,
  Select,
  Textarea,
  ConsentCheckbox,
  Honeypot,
  FormStatus,
} from '../common/FormControls.jsx';
import { inquirySchema, viewingSchema, INQUIRY_TAB, VIEWING_TAB } from '../../lib/schemas.js';
import { submitForm } from '../../lib/submitForm.js';
import { properties } from '../../data/properties.js';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

export default function ContactSection({ scheduleSource }) {
  const [activeTab, setActiveTab] = useState(INQUIRY_TAB);
  const [inquiryStatus, setInquiryStatus] = useState(STATUS.idle);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [viewingStatus, setViewingStatus] = useState(STATUS.idle);
  const [viewingMessage, setViewingMessage] = useState('');
  const [viewingPropertyId, setViewingPropertyId] = useState(scheduleSource?.id || '');

  // Synchronize external schedule clicks: switch tab and preselect property.
  useEffect(() => {
    if (scheduleSource?.id) {
      setActiveTab(VIEWING_TAB);
      setViewingPropertyId(scheduleSource.id);
    }
  }, [scheduleSource]);

  const inquiryForm = useForm({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: '', email: '', phone: '', message: '', consent: false, company: '' },
  });

  const viewingForm = useForm({
    resolver: zodResolver(viewingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      propertyId: viewingPropertyId || '',
      message: '',
      consent: false,
      website: '',
    },
  });

  // Update viewing form when scheduleSource changes
  useEffect(() => {
    if (scheduleSource?.id) {
      viewingForm.setValue('propertyId', scheduleSource.id);
    }
  }, [scheduleSource, viewingForm]);

  const onInquirySubmit = useCallback(
    async (values) => {
      setInquiryStatus(STATUS.loading);
      setInquiryMessage('');
      const result = await submitForm({ kind: 'inquiry', ...values });
      if (result.success) {
        setInquiryStatus(STATUS.success);
        setInquiryMessage(result.message);
        inquiryForm.reset();
      } else {
        setInquiryStatus(STATUS.error);
        setInquiryMessage(result.message || 'Something went wrong.');
      }
    },
    [inquiryForm]
  );

  const onViewingSubmit = useCallback(
    async (values) => {
      setViewingStatus(STATUS.loading);
      setViewingMessage('');
      const result = await submitForm({ kind: 'viewing', ...values });
      if (result.success) {
        setViewingStatus(STATUS.success);
        setViewingMessage(result.message);
        viewingForm.reset();
      } else {
        setViewingStatus(STATUS.error);
        setViewingMessage(result.message || 'Something went wrong.');
      }
    },
    [viewingForm]
  );

  const tabs = [
    {
      id: INQUIRY_TAB,
      label: 'Inquiry',
      render: () => (
        <InquiryForm
          form={inquiryForm}
          status={inquiryStatus}
          message={inquiryMessage}
          onSubmit={onInquirySubmit}
        />
      ),
    },
    {
      id: VIEWING_TAB,
      label: 'Viewing request',
      render: () => (
        <ViewingForm
          form={viewingForm}
          status={viewingStatus}
          message={viewingMessage}
          onSubmit={onViewingSubmit}
          propertyId={viewingPropertyId}
        />
      ),
    },
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 bg-ivory" aria-label="Contact AURELIS ESTATES">
      <div className="container-editorial">
        <SectionHeading
          eyebrow="Contact"
          title="Begin a confidential conversation"
          description="Send an inquiry, or request a viewing of any property. A senior advisor responds within one business day."
          className="mb-10"
        />

        <div className="max-w-2xl mx-auto bg-white border border-charcoal/10 shadow-card p-6 lg:p-8">
          <AccessibleTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} idBase="contact-tabs" />
        </div>

        {scheduleSource && (
          <p className="mt-6 text-center text-sm text-charcoal/70" role="status">
            Pre-selected property: <span className="text-charcoal">{scheduleSource.name}</span>
          </p>
        )}
      </div>
    </section>
  );
}

function InquiryForm({ form, status, message, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const submitting = status === STATUS.loading || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Honeypot register={register} name="company" label="Company (leave empty)" />

      <FormField id="inquiry-name" label="Full name" required error={errors.name}>
        <Input id="inquiry-name" invalid={errors.name} autoComplete="name" {...register('name')} placeholder="Your name" />
      </FormField>

      <FormField id="inquiry-email" label="Email" required error={errors.email}>
        <Input id="inquiry-email" type="email" invalid={errors.email} autoComplete="email" {...register('email')} placeholder="you@example.com" />
      </FormField>

      <FormField id="inquiry-phone" label="Phone" required error={errors.phone} className="sm:col-span-2">
        <Input id="inquiry-phone" type="tel" invalid={errors.phone} autoComplete="tel" {...register('phone')} placeholder="+1 (555) 010-0000" />
      </FormField>

      <FormField id="inquiry-message" label="Message" required error={errors.message} className="sm:col-span-2">
        <Textarea id="inquiry-message" invalid={errors.message} rows={5} {...register('message')} placeholder="A few sentences about your interest…" />
      </FormField>

      <div className="sm:col-span-2">
        <ConsentCheckbox
          id="inquiry-consent"
          label="I consent to be contacted about this inquiry."
          error={errors.consent}
          register={register('consent')}
        />
      </div>

      <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-4 mt-2">
        <Button type="submit" variant="gold" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <CheckCircle2 size={16} aria-hidden="true" />
          )}
          {submitting ? 'Sending…' : 'Send inquiry'}
        </Button>
        {status === STATUS.error && (
          <span className="inline-flex items-center gap-1 text-xs text-rose-700" aria-hidden="true">
            <AlertCircle size={14} /> Submission failed
          </span>
        )}
      </div>

      <div className="sm:col-span-2">
        <FormStatus status={status} message={message} />
      </div>
    </form>
  );
}

function ViewingForm({ form, status, message, onSubmit, propertyId }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const submitting = status === STATUS.loading || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Honeypot register={register} name="website" label="Website (leave empty)" />

      <FormField id="viewing-name" label="Full name" required error={errors.name}>
        <Input id="viewing-name" invalid={errors.name} autoComplete="name" {...register('name')} placeholder="Your name" />
      </FormField>

      <FormField id="viewing-email" label="Email" required error={errors.email}>
        <Input id="viewing-email" type="email" invalid={errors.email} autoComplete="email" {...register('email')} placeholder="you@example.com" />
      </FormField>

      <FormField id="viewing-phone" label="Phone" required error={errors.phone}>
        <Input id="viewing-phone" type="tel" invalid={errors.phone} autoComplete="tel" {...register('phone')} placeholder="+1 (555) 010-0000" />
      </FormField>

      <FormField id="viewing-property" label="Property" required error={errors.propertyId}>
        <Select id="viewing-property" invalid={errors.propertyId} defaultValue={propertyId} {...register('propertyId')}>
          <option value="" disabled>
            Select a property
          </option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — {p.location}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField id="viewing-date" label="Preferred date" required error={errors.preferredDate}>
        <Input
          id="viewing-date"
          type="date"
          invalid={errors.preferredDate}
          {...register('preferredDate')}
        />
      </FormField>

      <FormField id="viewing-time" label="Preferred time" required error={errors.preferredTime}>
        <Input
          id="viewing-time"
          type="time"
          invalid={errors.preferredTime}
          {...register('preferredTime')}
        />
      </FormField>

      <FormField
        id="viewing-message"
        label="Optional message"
        error={errors.message}
        className="sm:col-span-2"
      >
        <Textarea id="viewing-message" invalid={errors.message} rows={3} {...register('message')} placeholder="Travel plans, accompanying guests…" />
      </FormField>

      <div className="sm:col-span-2">
        <ConsentCheckbox
          id="viewing-consent"
          label="I consent to be contacted to confirm this viewing."
          error={errors.consent}
          register={register('consent')}
        />
      </div>

      <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-4 mt-2">
        <Button type="submit" variant="gold" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
          ) : (
            <CheckCircle2 size={16} aria-hidden="true" />
          )}
          {submitting ? 'Sending…' : 'Request viewing'}
        </Button>
        {status === STATUS.error && (
          <span className="inline-flex items-center gap-1 text-xs text-rose-700" aria-hidden="true">
            <AlertCircle size={14} /> Submission failed
          </span>
        )}
      </div>

      <div className="sm:col-span-2">
        <FormStatus status={status} message={message} />
      </div>
    </form>
  );
}
