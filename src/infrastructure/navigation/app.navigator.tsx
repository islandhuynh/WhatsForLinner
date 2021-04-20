import React, { useContext, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { SafeArea } from '../../components/utility/safe.area.component';
import { WhatToEat } from '../../screens/what-to-eat/what-to-eat.screen';
import { SavedRestaurants } from '../../screens/saved-restaurant/saved-restaurant.screen';
import { AccountScreen } from '../../screens/authentification/account.screen';

import { AuthContext } from '../../services/authentification/firebase-auth';


const Drawer = createDrawerNavigator();

const FindRestaurants = (): JSX.Element => {
  return (
    <SafeArea>
      <View>
        <Text>Map API</Text>
      </View>
    </SafeArea>
  )
}

const Settings = (): JSX.Element => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeArea>
      <View>
        <Text>Settings</Text>
        <Button title="logout" onPress={() => logout()} />
      </View>
    </SafeArea>
  )
}

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