// src/config/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const REQUIRED = {
	VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
};

for (const [k, v] of Object.entries(REQUIRED)) {
	if (!v) console.error('[firebase] Missing env:', k);
}

const options: FirebaseOptions = {
	apiKey: REQUIRED.VITE_FIREBASE_API_KEY || '',
	authDomain: REQUIRED.VITE_FIREBASE_AUTH_DOMAIN || '',
	projectId: REQUIRED.VITE_FIREBASE_PROJECT_ID || '',
	storageBucket: REQUIRED.VITE_FIREBASE_STORAGE_BUCKET || '',
	messagingSenderId: REQUIRED.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
	appId: REQUIRED.VITE_FIREBASE_APP_ID || '',
};

function ensureApp(): FirebaseApp {
	const apps = getApps();
	if (apps.length) return getApp();
	if (!options.projectId) throw new Error('[firebase] projectId is empty. Check your VITE_* env & build step.');
	return initializeApp(options);
}

const app = ensureApp();
export const db = getFirestore(app);
export const storage = getStorage(app);

// 런타임 확인 로그
console.log('[firebase] projectId =', app.options.projectId);
