import React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const WhatToEat = (): JSX.Element => {
  return (
    <View>
      <Text>What to eat screen</Text>
    </View>
  )
}

const FindRestaurants = (): JSX.Element => {
  return (
    <View>
      <Text>Map API</Text>
    </View>
  )
}

const VisitedRestaurants = (): JSX.Element => {
  return (
    <View>
      <Text>Folders</Text>
    </View>
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