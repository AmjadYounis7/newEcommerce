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

export function validateDelivery(data: Delivery): Errors {
  const errors: Errors = {};
  if (data.name.trim().length < 2)
    errors.name = 'Enter your full name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = 'Enter a valid email address.';
  const digits = data.phone.replace(/\D/g, '');
  if (
    !/^\+?[\d\s().-]+$/.test(data.phone.trim()) ||
    digits.length < 7 ||
    digits.length > 15
  ) {
    errors.phone = 'Enter a phone number with 7 to 15 digits.';
  }
  if (data.address.trim().length < 5)
    errors.address = 'Enter your street and building details.';
  if (data.city.trim().length < 2) errors.city = 'Enter your city or town.';
  return errors;
}
