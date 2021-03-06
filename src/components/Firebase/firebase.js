import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
}

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.database = app.database();
    this.storage = app.storage();
  }

  createNote = (title, body) =>
    this.database.ref('notes').push({
      title: title,
      body: body
    })

  updateNote = (id, title, body) =>
    this.database.ref('/notes/' +id).set({
      title: title,
      body: body
    })

  imageRef = (id) =>
    this.storage.ref('/notes/' + id + '/').child('image')

  deleteNote = (id) =>
    this.database.ref('/notes/' +id).remove()

  getNotes = () =>
    this.database.ref('/notes');

  getNote = (id) =>
    this.database.ref('/notes/' +id)

  createUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  googleProvider = new app.auth.GoogleAuthProvider();

  providerSignIn = (provider) =>
    this.auth.signInWithPopup(provider);

  currentUser = () =>
    this.auth.currentUser;
}

export default Firebase;
