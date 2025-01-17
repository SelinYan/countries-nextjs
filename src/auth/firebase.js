import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { getFavourites } from "../store/favouritesSlice";

const firebaseConfig = {
  apiKey: "AIzaSyCpeMYl1sICsOomawDY4-JkqlrdsNluakw",
  authDomain: "countries-wen.firebaseapp.com",
  projectId: "countries-wen",
  storageBucket: "countries-wen.appspot.com",
  messagingSenderId: "859578437059",
  appId: "1:859578437059:web:5149691b299d78899d0176",
  measurementId: "G-LCD4GYKHG3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      favourites: [], // Initialize an empty favourites array
    });
  } catch (error) {
    alert(error.message);
  }
};

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error.message);
  }
};

export const logout = () => {
  auth.signOut();
};

export const getNameOfUser = async (user) => {
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const name = userDoc.data().name;
      console.log("name from getNameOfUser: ", name);
      return name;
    } else {
      console.log("No user data found");
      return null;
    }
  } else {
    return null;
  }
};

export const addFavouriteToFirebase = async (uid, name) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedFavourites = [...userData.favourites, name];
      await setDoc(userDocRef, { ...userData, favourites: updatedFavourites });
      console.log("Favourite added to Firebase database");
    }
  } catch (err) {
    console.error("Error adding favourite to Firebase database: ", err);
  }
};

export const removeFavouriteFromFirebase = async (uid, name) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedFavourites = userData.favourites.filter(
        (favourite) => favourite !== name
      );
      await setDoc(userDocRef, { ...userData, favourites: updatedFavourites });
      console.log("Favourite removed from Firebase database");
    }
  } catch (err) {
    console.error("Error removing favourite from Firebase database: ", err);
  }
};

export const clearFavouritesFromFirebase = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, { favourites: [] }, { merge: true });
    console.log("Favourites removed from Firebase database");
  } catch (err) {
    console.error("Error removing favourites from Firebase database: ", err);
  }
};

export const getFavouritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const favourites = userDoc.data().favourites;
      dispatch(getFavourites(favourites));
    }
  }
};

export { auth, db, registerWithEmailAndPassword };