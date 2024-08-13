import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5Uab3oXRkmKeIXxLM-bF4p_S9oyBMvT4",
  authDomain: "linktree-clone-76d85.firebaseapp.com",
  projectId: "linktree-clone-76d85",
  storageBucket: "linktree-clone-76d85.appspot.com",
  messagingSenderId: "511080230798",
  appId: "1:511080230798:web:5fde2d6bd078c0aa57bedf"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();