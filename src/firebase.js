import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCokGEfZnX9Ngx5eqpgpz0eTqb_QST-npk",
    authDomain: "zyshop-a76ea.firebaseapp.com",
    databaseURL: "https://zyshop-a76ea.firebaseio.com",
    projectId: "zyshop-a76ea",
    storageBucket: "zyshop-a76ea.appspot.com",
    messagingSenderId: "82102660056",
    appId: "1:82102660056:web:4ed9e28310ddfc2142e0ad"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();