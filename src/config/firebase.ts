// src/config/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

let firebaseApp: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
	if (firebaseApp) return firebaseApp;

	const required = {
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
		authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
		projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
		storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
		appId: import.meta.env.VITE_FIREBASE_APP_ID,
	};

	// 누락된 env 체크
	Object.entries(required).forEach(([key, value]) => {
		if (!value) console.error('[firebase] Missing env:', key);
	});

	const options: FirebaseOptions = {
		apiKey: required.apiKey,
		authDomain: required.authDomain,
		projectId: required.projectId,
		storageBucket: required.storageBucket,
		messagingSenderId: required.messagingSenderId,
		appId: required.appId,
	};

	if (!options.projectId) {
		throw new Error('[firebase] projectId is empty. Check .env variables.');
	}

	firebaseApp = getApps().length ? getApp() : initializeApp(options);

	console.log('[firebase] initialized projectId =', firebaseApp.options.projectId);

	return firebaseApp;
}

// Firestore & Storage export (지연 초기화)
export const db = () => getFirestore(getFirebaseApp());
export const storage = () => getStorage(getFirebaseApp());
