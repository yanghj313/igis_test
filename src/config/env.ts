// src/config/env.ts
export const IS_TEST = import.meta.env.VITE_IS_TEST === 'true';

export const EMAIL_ENDPOINT = String(import.meta.env.VITE_EMAIL_ENDPOINT || '');
export const EMAIL_TO = String(import.meta.env.VITE_EMAIL_TO || 'ceo@igis.co.kr');
export const SEND_EMAIL = String(import.meta.env.VITE_SEND_EMAIL || 'true') === 'true';
