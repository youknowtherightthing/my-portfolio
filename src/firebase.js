import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDp-AF0S2WFlxowCFxDQmeL_Sbc0W7feb0",
    authDomain: "my-portfolio-storage-6ced2.firebaseapp.com",
    projectId: "my-portfolio-storage-6ced2",
    storageBucket: "my-portfolio-storage-6ced2.firebasestorage.app",
    messagingSenderId: "638570490794",
    appId: "1:638570490794:web:8be27aa19b4f990b2e99d3"
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)