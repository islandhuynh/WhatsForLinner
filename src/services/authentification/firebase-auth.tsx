import firebase from 'firebase/app';
import React, { createContext, useState } from 'react';

import 'firebase/auth';

import { firebaseConfig } from '../../../config/firebaseconfig';

// Should add auth context for user

export const AuthContext = createContext({} as any);

const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

export const FirebaseAuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<{} | undefined>(undefined);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => setUser(u))
      .catch(e => setError(e.toString()));
    setIsLoading(false);
  }

  const logout = async () => {
    setIsLoading(true);
    await firebase.auth().signOut();
    setUser(undefined);
    setError(null);
    setIsLoading(false);
  }

  initFirebase();

  return (
    <>
      <AuthContext.Provider value={{
        user,
        setUser,
        error,
        setError,
        isLoading,
        setIsLoading,
        login,
        logout
      }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}