import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";
import type { User } from "firebase/auth";

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

function userStore() {

  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    }
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    onAuthStateChanged(auth, (user) => {
      set(user);
    }); 

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
  }

  export const user = userStore();
