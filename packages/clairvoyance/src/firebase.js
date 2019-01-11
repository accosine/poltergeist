import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase } from '@firebase/app';
import '@firebase/storage';
import '@firebase/firestore';
import '@firebase/auth';
import firebaseconfig from './config';
import useLocalStorage from './util/useLocalStorage';

const LOCALSTORAGE_KEY = 'firebase-poltergeist-authenticated';

firebase.initializeApp(firebaseconfig);
const provider = new firebase.auth.FacebookAuthProvider();
const auth = firebase.auth();

const firebaseApi = {
  firestore: firebase.firestore(),
  storage: firebase.storage(),
};

const useAuthentication = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isAuthenticated, setAuthenticated] = useLocalStorage(
    LOCALSTORAGE_KEY,
    false
  );

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => setUser(user));
    return unsubscribe;
  }, []);

  function signOut() {
    setLoading(true);
    setError(false);
    auth
      .signOut()
      .then(() => {
        setLoading(false);
        setAuthenticated(false);
      })
      .catch(setError);
  }

  function signIn() {
    setLoading(true);
    setError(false);
    auth
      .signInWithPopup(provider)
      .then(() => {
        setLoading(false);
        setAuthenticated(true);
      })
      .catch(setError);
  }

  return { isAuthenticated, user, signIn, signOut, loading, error };
};

export const Context = createContext();

export const FirebaseContext = Context;

export const useFirebaseContext = () => useContext(Context);

export const useFirestoreCollectionSubscription = collection => {
  const { firestore } = useFirebaseContext();
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      setLoading(true);
      // return unsubscribe function
      return firestore.collection(collection).onSnapshot(snapshot => {
        setElements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      });
    },
    [collection]
  );
  return [elements, loading];
};

export const FirebaseProvider = ({ children }) => {
  const authentication = useAuthentication();
  return (
    <Context.Provider value={{ ...firebaseApi, authentication }}>
      {children}
    </Context.Provider>
  );
};
