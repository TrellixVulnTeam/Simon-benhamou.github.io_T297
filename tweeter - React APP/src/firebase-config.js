import { initializeApp } from "firebase/app";
import{getAuth} from '@firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyCuFI9E8fdN0iG1UmN6ZLs6gtr6T_tusTQ",

  authDomain: "tweeter-82781.firebaseapp.com",

  projectId: "tweeter-82781",

  storageBucket: "tweeter-82781.appspot.com",

  messagingSenderId: "26909236795",

  appId: "1:26909236795:web:03af84ad5b90ed4e87c61e",

  measurementId: "G-NLSST4FD6Y"

};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)