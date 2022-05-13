// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBRhECpg8Z5pM5D4hW-N_E9OMl9qISSaXY',
  authDomain: 'weblog-website.firebaseapp.com',
  projectId: 'weblog-website',
  storageBucket: 'weblog-website.appspot.com',
  messagingSenderId: '604038574288',
  appId: '1:604038574288:web:1e8a40286594b8605b2ed5',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
