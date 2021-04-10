import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAtYhGQycrVLoU5Qosoty_rsBw8rqH-SYQ",
  authDomain: "next-course-480b0.firebaseapp.com",
  projectId: "next-course-480b0",
  storageBucket: "next-course-480b0.appspot.com",
  messagingSenderId: "704613715466",
  appId: "1:704613715466:web:f90a99ad3dc2421a2559f3",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
