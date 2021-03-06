import firebase from 'firebase/app';
import React, { createContext, useState } from 'react';
import { LogBox } from 'react-native';

import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from '../../../config/firebaseconfig';

import { defaultRestaurantList } from '../../default/default-restaurant-list';
import { RestaurantDetail } from '../../categories/restaurantDetails';

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
  const [savedRestaurants, setSavedRestaurants] = useState<RestaurantDetail[]>([])

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => {
        setUser(u)
        logUser(u.user!.uid)
      })
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

  const registerUser = async (email: string, password: string) => {
    setIsLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(u => {
        setUser(u);
        createUserDBAccount(u.user!.uid, email);
      })
      .catch(e => setError(e.toString()));

    setIsLoading(false);
  }

  const createUserDBAccount = async (userId: string, email: string) => {
    await firebase.database().ref('Users/' + userId).set({
      uid: userId,
      email,
      restaurantList: defaultRestaurantList,
      savedLists: []
    })
  }

  const logUser = async (userId: string) => {
    let list: RestaurantDetail[] = [];
    await firebase.database().ref('Users/' + userId).once('value').then((snapshot) => {
      list = (snapshot.val().restaurantList)
    })

    setSavedRestaurants(list);
  }

  const updateRestaurantList = async (userId: string, updatedList: RestaurantDetail[]) => {
    await firebase.database().ref('Users/' + userId + '/restaurantList/')
      .set(updatedList)
      .catch(e => setError(e.toString()));

    setSavedRestaurants(updatedList);
  }

  LogBox.ignoreLogs(['Setting a timer']);

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
        logout,
        registerUser,
        savedRestaurants,
        setSavedRestaurants,
        updateRestaurantList
      }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}