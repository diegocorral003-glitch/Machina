import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBmRH868e6uDiSyA7I_eQ3EVvUsbGxY8vw",
  authDomain: "machina-2dd5b.firebaseapp.com",
  projectId: "machina-2dd5b",
  storageBucket: "machina-2dd5b.firebasestorage.app",
  messagingSenderId: "1095779693158",
  appId: "1:1095779693158:web:06ce99c3e6508b5ec633a7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);