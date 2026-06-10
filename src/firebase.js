// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDp-AF0S2WFlxowCFxDQmeL_Sbc0W7feb0",
    authDomain: "my-portfolio-storage-6ced2.firebaseapp.com",
    projectId: "my-portfolio-storage-6ced2",
    storageBucket: "my-portfolio-storage-6ced2.firebasestorage.app",
    messagingSenderId: "638570490794",
    appId: "1:638570490794:web:8be27aa19b4f990b2e99d3",
    measurementId: "G-XH4LWL24DY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);