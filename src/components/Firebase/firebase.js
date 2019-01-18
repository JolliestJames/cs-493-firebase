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

  createNote = (user_id, title, body) =>
    this.database.ref('notes/' + user_id).push({
      title: title,
      body: body
    })

  updateNote = (user_id, note_id, title, body) =>
    this.database.ref('/notes/' + user_id + '/' + note_id).set({
      title: title,
      body: body
    })

  imageRef = (user_id, note_id) =>
    this.storage.ref('/notes/' + user_id + '/' + note_id + '/').child('image')

  deleteNote = (user_id, note_id) =>
    this.database.ref('/notes/' + user_id + '/' + note_id).remove()

  getNotes = (user_id) =>
    this.database.ref('/notes/' + user_id);

  getNote = (user_id, note_id) =>
    this.database.ref('/notes/' + user_id + '/' + note_id)

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
