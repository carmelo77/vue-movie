import Vue from 'vue'
import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyB7lSegeeHHzZhTMXY3_LStl-vSdfuD2RY",
    authDomain: "movie-cinema.firebaseapp.com",
    databaseURL: "https://movie-cinema.firebaseio.com",
    projectId: "movie-cinema",
    storageBucket: "movie-cinema.appspot.com",
    messagingSenderId: "1017658131832"
  };

  let fire = firebase.initializeApp(config);
  let db = fire.database()

  export default db