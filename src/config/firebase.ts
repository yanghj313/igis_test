// src/config/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyC36OmlCWgka02qmDsiGYSiuoZMMSnU_UI',
	authDomain: 'igis-web.firebaseapp.com',
	projectId: 'igis-web',
	storageBucket: 'igis-web.appspot.com',
	messagingSenderId: '456189682289',
	appId: '1:456189682289:web:c08b149a08a3ead85cb1d0',
	measurementId: 'G-E2KQWWQG06',
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

console.log('FIREBASE PROJECT:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
