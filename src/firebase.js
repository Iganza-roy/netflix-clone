import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
  apiKey: 'AIzaSyBW66E77RithNwz1SsgPuI4RqlOLQQNrBk',
  authDomain: 'netflix-clone-16c7d.firebaseapp.com',
  projectId: 'netflix-clone-16c7d',
  storageBucket: 'netflix-clone-16c7d.firebasestorage.app',
  messagingSenderId: '273988943793',
  appId: '1:273988943793:web:0f8497c813d22afeea4790',
  measurementId: 'G-JQ5SZ9EC72',
};
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (error) {
    console.log('Error creating user:', error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log('Error signing in:', err);
    alert(err.message);
  }
};

const logout = () => {
    signOut(auth);
}

export {auth, db, login, logout, signUp}