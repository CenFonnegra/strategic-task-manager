import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAHBqK0U4xGoxG2BQrVeqUsp-Rqj03bSJg",
    authDomain: "strategic-task-manager.firebaseapp.com",
    projectId: "strategic-task-manager",
    storageBucket: "strategic-task-manager.firebasestorage.app",
    messagingSenderId: "429722733358",
    appId: "1:429722733358:web:f01a7984ebd1c12dad08bf",
    measurementId: "G-N7JWW6GYW9"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);   
export const db = getFirestore(app);