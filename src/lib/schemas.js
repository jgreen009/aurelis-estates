import { z } from 'zod';

const honeypotField = z
  .string()
  .max(0, 'Honeypot field must remain empty.')
  .optional()
  .or(z.literal(''));

const consentField = z.boolean().refine((v) => v === true, {
  message: 'Please consent to be contacted.',
});

const nameField = z
  .string()
  .trim()
  .min(2, 'Please enter your full name.')
  .max(120, 'Name is too long.');

const emailField = z.string().trim().email('Please enter a valid email address.');

const phoneField = z
  .string()
  .trim()
  .min(7, 'Please enter a contact number with area code.')
  .max(32, 'Phone number is too long.')
  .regex(/^[0-9()+\-\s.]+$/, 'Phone may contain digits and the characters + ( ) - .');

const messageField = z
  .string()
  .trim()
  .min(10, 'Please share a few sentences about your interest.')
  .max(2000, 'Message is too long (max 2000 characters).');

const preferredDateField = z
  .string()
  .trim()
  .min(1, 'Please choose a preferred date.')
  .refine((value) => {
    const dt = new Date(value);
    if (Number.isNaN(dt.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dt >= today;
  }, 'Preferred date cannot be in the past.');

const preferredTimeField = z
  .string()
  .trim()
  .min(1, 'Please choose a preferred time.');

const propertyOfInterestField = z.string().trim().min(1, 'Please select a property.');

export const inquirySchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  message: messageField,
  consent: consentField,
  company: honeypotField,
});

export const viewingSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  preferredDate: preferredDateField,
  preferredTime: preferredTimeField,
  propertyId: propertyOfInterestField,
  message: z.string().trim().max(2000, 'Message is too long.').optional().or(z.literal('')),
  consent: consentField,
  website: honeypotField,
});

export const INQUIRY_TAB = 'inquiry';
export const VIEWING_TAB = 'viewing';
