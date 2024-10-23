// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCz7O9ko_GS6Hk-d4hNSYI2RLYF8U8d-Lo",
  authDomain: "sirviapp-8be80.firebaseapp.com",
  projectId: "sirviapp-8be80",
  storageBucket: "sirviapp-8be80.appspot.com",
  messagingSenderId: "825414315663",
  appId: "1:825414315663:web:8bf0cfb93e09b3dc61cafa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
