// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwBALmZJsmcTmNKl-ZIpYH4nDF2wtdbgk",
  authDomain: "fixit-3666f.firebaseapp.com",
  projectId: "fixit-3666f",
  storageBucket: "fixit-3666f.appspot.com",
  messagingSenderId: "486142616471",
  appId: "1:486142616471:web:ca0ed4e7cfa44839491ad2",
  measurementId: "G-NHEZDP20DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);