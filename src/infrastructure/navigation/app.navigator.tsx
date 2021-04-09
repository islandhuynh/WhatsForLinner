import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { SafeArea } from '../../components/utility/safe.area.component';
import { WhatToEat } from '../../screens/what-to-eat/what-to-eat.screen';

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

const VisitedRestaurants = (): JSX.Element => {
  return (
    <SafeArea>
      <View>
        <Text>Folders</Text>
      </View>
    </SafeArea>
  )
}

export const AppNavigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="What To Eat">
        <Drawer.Screen name="What To Eat" component={WhatToEat} />
        <Drawer.Screen name="Find Restaurant" component={FindRestaurants} />
        <Drawer.Screen name="Restaurant List" component={VisitedRestaurants} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}