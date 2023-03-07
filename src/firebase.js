import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCZegh_DU0SmEois5D42_P8EjGX5J-n80Y",
    authDomain: "movie-trivia-ed581.firebaseapp.com",
    projectId: "movie-trivia-ed581",
    storageBucket: "movie-trivia-ed581.appspot.com",
    messagingSenderId: "920806916791",
    appId: "1:920806916791:web:e10ea91e9cb2d8a8a48332"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app);

export { auth, db };
