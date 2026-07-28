// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANRflBP3P1sGB9gwXfzGDoiihrbQ9imxg",
  authDomain: "yoas-e1fe2.firebaseapp.com",
  projectId: "yoas-e1fe2",
  storageBucket: "yoas-e1fe2.firebasestorage.app",
  messagingSenderId: "768983650819",
  appId: "1:768983650819:web:599e67f17e8a7f93a4f436"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);