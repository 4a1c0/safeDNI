import type { FieldRegion, Preset } from '../types';

// Field regions are defined in normalized [0,1] coordinates relative to the warped card.
export const FIELD_MAP_FRONT: FieldRegion[] = [
  {
    id: 'photo',
    label: 'Photo',
    polygon: [
      { x: 0.05, y: 0.1 },
      { x: 0.3, y: 0.1 },
      { x: 0.3, y: 0.55 },
      { x: 0.05, y: 0.55 },
    ],
  },
  {
    id: 'nif',
    label: 'NIF/DNI number',
    polygon: [
      { x: 0.35, y: 0.15 },
      { x: 0.9, y: 0.15 },
      { x: 0.9, y: 0.25 },
      { x: 0.35, y: 0.25 },
    ],
  },
];

export const FIELD_MAP_BACK: FieldRegion[] = [
  {
    id: 'address',
    label: 'Address',
    polygon: [
      { x: 0.05, y: 0.15 },
      { x: 0.95, y: 0.15 },
      { x: 0.95, y: 0.3 },
      { x: 0.05, y: 0.3 },
    ],
  },
  {
    id: 'mrz',
    label: 'MRZ',
    polygon: [
      { x: 0, y: 0.85 },
      { x: 1, y: 0.85 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ],
  },
];

export const PRESETS: Preset[] = [
  {
    id: 'hotel_checkin',
    name: 'Hotel check-in',
    description: 'Hide ID number, photo, signature, address, parents, MRZ, CAN, IDESP. Keep name + expiry visible.',
    fields: ['nif', 'photo', 'signature', 'address', 'parents', 'mrz', 'can', 'idesp'],
    defaults: { style: 'block', opacity: 1 },
  },
  {
    id: 'car_rental',
    name: 'Car rental',
    description: 'Hide address, parents, signature, MRZ, CAN, IDESP. Optionally mask ID number.',
    fields: ['address', 'parents', 'signature', 'mrz', 'can', 'idesp'],
    defaults: { style: 'blur', opacity: 0.9 },
  },
  {
    id: 'age_check',
    name: 'Age verification',
    description: 'Show photo and birth year; mask day/month and everything else.',
    fields: ['dob_day_month', 'nif', 'signature', 'address', 'parents', 'mrz', 'can', 'idesp', 'issue', 'serial'],
    defaults: { style: 'pixelate', opacity: 1 },
  },
  {
    id: 'kyc_preview',
    name: 'KYC preview',
    description: 'Mask only MRZ and signature by default.',
    fields: ['mrz', 'signature'],
    defaults: { style: 'block', opacity: 1 },
  },
];
