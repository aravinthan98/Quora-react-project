
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    // signInWithPopup,
    // signInWithEmailAndPassword,
    // createUserWithEmailAndPassword,
    // sendPasswordResetEmail,
    // signOut,
    FacebookAuthProvider

    // onAuthStateChanged
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAViJ_eBTP1ePedJCrpZ8O3y4xcAaE76tU",
  authDomain: "quora-clone-39d3b.firebaseapp.com",
  projectId: "quora-clone-39d3b",
  storageBucket: "quora-clone-39d3b.appspot.com",
  messagingSenderId: "754487928680",
  appId: "1:754487928680:web:e693c651227720e9d058dd",
  measurementId: "G-C8CJKVQT9Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
    auth,
    googleProvider,
    facebookProvider
    
};