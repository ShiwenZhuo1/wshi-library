import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9I1h9BjgJIJXtxO6PAs2scjzHU-xNHe4",
  authDomain: "week7-wenzhuoshi.firebaseapp.com",
  projectId: "week7-wenzhuoshi",
  storageBucket: "week7-wenzhuoshi.firebasestorage.app",
  messagingSenderId: "673846011848",
  appId: "1:673846011848:web:5567b332a44e996ef902fd"
};

initializeApp(firebaseConfig);
const db = getFirestore()
export default db
