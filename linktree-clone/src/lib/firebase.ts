import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable, type Readable, derived } from "svelte/store";

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

  export function docStore<T>(
    path: string,
  ) {
    let unsubscribe: () => void;

    const docRef = doc(db, path);
    const { subscribe } = writable<T | null>(null, (set) => {
      unsubscribe = onSnapshot(docRef, (snapshot) => {
        set((snapshot.data() as T) ?? null);
      });

      return () => unsubscribe();
    })

    return {
      subscribe,
      ref: docRef,
      id: docRef.id,
    }    
  }

  interface UserData {
    username: string;
    bio: string;
    photoURL: string;
    links: any[]; 
  }


  export const userData: Readable<UserData | null> = derived(user, ($user, set) => { 
    if ($user) {
      return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
    } else {
      set(null); 
    }
  });  