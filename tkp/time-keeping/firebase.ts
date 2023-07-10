// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC14T-jU96RqlVo5nlkL92W9n9y3akniM",
  authDomain: "jin-nie.firebaseapp.com",
  projectId: "jin-nie",
  storageBucket: "jin-nie.appspot.com",
  messagingSenderId: "543334601384",
  appId: "1:543334601384:web:271e306a00d4113c5ce89d",
  measurementId: "G-414XY990V0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
auth.languageCode = "it";
async function getCities(db: any) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}
export default app;
