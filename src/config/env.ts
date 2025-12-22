// src/config/env.ts
const env = import.meta.env;

export const IS_TEST = env.VITE_IS_TEST === 'true';

export const SEND_EMAIL = (env.VITE_SEND_EMAIL ?? 'false') === 'true'; // 기본 false 추천
export const EMAIL_ENDPOINT = env.VITE_EMAIL_ENDPOINT ?? '';
export const EMAIL_TO = env.VITE_EMAIL_TO ?? 'ceo@igis.co.kr';

// 선택: 실행 시점 가드(전송 켰는데 endpoint 없으면 막기)
export const CAN_SEND_EMAIL = SEND_EMAIL && EMAIL_ENDPOINT.length > 0;
