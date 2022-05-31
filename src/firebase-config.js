import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBQjXwI6T_h1wOXhTNsxBn9TWZuiol_cxc",
    authDomain: "fyp-autosource.firebaseapp.com",
    projectId: "fyp-autosource",
    storageBucket: "fyp-autosource.appspot.com",
    messagingSenderId: "453624881971",
    appId: "1:453624881971:web:0b7a58fcdf8eaefcba1446",
    measurementId: "G-4L38BDGQ6G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);