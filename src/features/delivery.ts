import { z } from 'zod';

// Keep the field definitions and validation together for consistent labels and error placement.
export const fields = [
  { name: 'name', label: 'Full name', autoComplete: 'name', type: 'text' },
  {
    name: 'email',
    label: 'Email address',
    autoComplete: 'email',
    type: 'email',
  },
  { name: 'phone', label: 'Phone number', autoComplete: 'tel', type: 'tel' },
  {
    name: 'address',
    label: 'Street address',
    autoComplete: 'street-address',
    type: 'text',
  },
  {
    name: 'city',
    label: 'City or town',
    autoComplete: 'address-level2',
    type: 'text',
  },
] as const;
export type DeliveryField = (typeof fields)[number]['name'];
export type Delivery = Record<DeliveryField, string>;
export type Errors = Partial<Delivery>;
export const blankDelivery: Delivery = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
};

const phoneError = 'Enter a phone number with 7 to 15 digits.';

const deliverySchema = z.object({
  name: z.string().trim().refine(
    (name) => name.length >= 2,
    'Enter your full name (at least 2 characters).',
  ),
  email: z.string().trim().regex(
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    'Enter a valid email address.',
  ),
  phone: z.string().trim()
    .regex(/^\+?[\d\s().-]+$/, phoneError)
    .refine((phone) => {
      const digitCount = phone.replace(/\D/g, '').length;
      return digitCount >= 7 && digitCount <= 15;
    }, phoneError),
  address: z.string().trim().refine(
    (address) => address.length >= 5,
    'Enter your street and building details.',
  ),
  city: z.string().trim().refine(
    (city) => city.length >= 2,
    'Enter your city or town.',
  ),
});

export function validateDelivery(data: Delivery): Errors {
  const result = deliverySchema.safeParse(data);
  if (result.success) return {};

  const { fieldErrors } = z.flattenError(result.error);
  const errors: Errors = {};

  for (const { name } of fields) {
    const message = fieldErrors[name]?.[0];
    if (message) errors[name] = message;
  }

  return errors;
}
