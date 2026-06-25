// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  
  authDomain: "loginonecart-ac631.firebaseapp.com",
  projectId: "loginonecart-ac631",
  storageBucket: "loginonecart-ac631.firebasestorage.app",
  messagingSenderId: "448379350612",
  appId: "1:448379350612:web:5fbb7cbc86e4d0199447c1",
  measurementId: "G-NLM4CVVLNB"
};

// console.log("আমার এপিআই কি:", import.meta.env.VITE_FIREBASE_API);
const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);
const auth= getAuth(app);
const provider =new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account'  // প্রতি বার অ্যাকাউন্ট সিলেক্ট করার অপশন দিবে
});

export {auth,provider}