import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAME3S2Ho7eUPoxQMsPx0vxHeoXSDc-So0',
  authDomain: 'spotipy-music.firebaseapp.com',
  projectId: 'spotipy-music',
  storageBucket: 'spotipy-music.appspot.com',
  messagingSenderId: '13159211833',
  appId: '1:13159211833:web:90b832e191a0f8ec0dbee8',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistance error ${error.code}`);
});

const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export { auth, db, storage, songsCollection, commentsCollection };
