// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-451e1.firebaseapp.com",
  projectId: "mern-blog-451e1",
  storageBucket: "mern-blog-451e1.appspot.com",
  messagingSenderId: "129236429786",
  appId: "1:129236429786:web:73ad359aac76c941ceeee3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

