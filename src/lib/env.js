const token = import.meta.env?.VITE_MAPBOX_TOKEN ?? '';
const formEndpoint = import.meta.env?.VITE_CONTACT_FORM_ENDPOINT ?? '';

export const hasMapboxToken =
  typeof token === 'string' && token.trim().length > 0 && token.toLowerCase() !== 'your_token_here';

export const hasFormEndpoint =
  typeof formEndpoint === 'string' &&
  formEndpoint.trim().length > 0 &&
  /^https?:\/\//i.test(formEndpoint);

export const mapboxToken = hasMapboxToken ? token : null;
export const contactFormEndpoint = hasFormEndpoint ? formEndpoint : null;
