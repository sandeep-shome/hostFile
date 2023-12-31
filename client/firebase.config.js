import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PRODUCT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSEGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const authConfig = getAuth(app);
export const provider = new GoogleAuthProvider();
