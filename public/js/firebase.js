// Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Import Firestore functions and initialize Firestore
import { setDoc, doc } from "firebase/firestore";
import { db } from './firebase.js'; // Ensure this matches your file structure


console.log('Firebase initialized:', app.name);
console.log('Banner Path:', bannerPath);


const firebaseConfig = {
  apiKey: "AIzaSyAetnlAQETVfHb5THVpJjrjZsPL4cC9Ltk",
  authDomain: "blogs-736ab.firebaseapp.com",
  databaseURL: "https://blogs-736ab-default-rtdb.firebaseio.com",
  projectId: "blogs-736ab",
  storageBucket: "blogs-736ab.firebasestorage.app",
  messagingSenderId: "626196228417",
  appId: "1:626196228417:web:87f952c88dc582226919c0",
  measurementId: "G-V416MNNKX2"
};


// Test Firestore write
setDoc(doc(db, "test", "testDoc"), { test: true })
    .then(() => {
        console.log("Test write successful.");
    })
    .catch((error) => {
        console.error("Test write failed:", error.message);
    });



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firestore and Storage
export { db, storage };

