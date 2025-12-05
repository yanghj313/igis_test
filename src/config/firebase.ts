// src/config/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function getFirebaseApp() {
	if (getApps().length) return getApp();
	return initializeApp(firebaseConfig);
}

const app = getFirebaseApp();

const _db: Firestore = getFirestore(app);
const _storage: FirebaseStorage = getStorage(app);

export const db = () => _db;
export const storage = () => _storage;
