import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { WhatToEat } from '../../screens/what-to-eat/what-to-eat.screen';
import { SavedRestaurants } from '../../screens/saved-restaurant/saved-restaurant.screen';
import { AccountScreen } from '../../screens/authentification/account.screen';
import { FindRestaurants } from '../../screens/find-restaurant/find-restaurant-screen';
import { Settings } from '../../screens/settings/settings-screen';

import { AuthContext } from '../../services/authentification/firebase-auth';

const Drawer = createDrawerNavigator();

export const AppNavigator = (): JSX.Element => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {!user ? <AccountScreen /> :
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="What To Eat">
            <Drawer.Screen name="What To Eat" component={WhatToEat} />
            <Drawer.Screen name="Find Restaurant" component={FindRestaurants} />
            <Drawer.Screen name="Restaurant List" component={SavedRestaurants} />
            <Drawer.Screen name="Settings" component={Settings} />
          </Drawer.Navigator>
        </NavigationContainer>
      }
    </>
  )
}