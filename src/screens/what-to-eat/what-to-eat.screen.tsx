import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';

import { SafeArea } from '../../components/utility/safe.area.component';

import { savedRestaurants } from '../../../mock/Restaurants.mock';

interface RestaurantDetail {
  name: string,
  courseType: string[],
  dollarSigns: number,
  category: string[]
}

export const WhatToEat = (): JSX.Element => {
  // defaults to main course upon start
  const [courseSelection, setCourseSelection] = useState('Main');
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetail | null>(null);

  const chooseRestaurant = () => {
    const filteredRestaurants = savedRestaurants;
    const randomInt = Math.floor(Math.random() * savedRestaurants.length);
    setSelectedRestaurant(filteredRestaurants[randomInt]);
  }

  const changeCourse = (courseType: string) => {
    if (courseType !== courseSelection) {
      setCourseSelection(courseType);
      setSelectedRestaurant(null)
    }
  }

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        <View style={styles.horizontalButtonContainer}>
          <Button color={courseSelection === 'Main' ? 'blue' : 'purple'} onPress={() => changeCourse('Main')}>Main</Button>
          <Button color={courseSelection === 'Dessert' ? 'blue' : 'purple'} onPress={() => changeCourse('Dessert')}>Dessert</Button>
          <Button color={courseSelection === 'Drinks' ? 'blue' : 'purple'} onPress={() => changeCourse('Drinks')}>Drinks</Button>
        </View>
        {selectedRestaurant ?
          <Card>
            <Card.Title title={selectedRestaurant.name} />
            <Card.Content>
              <Paragraph>{selectedRestaurant.dollarSigns}</Paragraph>
              <Paragraph onPress={() => Linking.openURL(`https://www.google.com/search?q=${selectedRestaurant.name}`)}>Location</Paragraph>
            </Card.Content>
          </Card>
          :
          <Text>Click on the button below to know what to eat</Text>
        }
        <Button onPress={() => chooseRestaurant()}>{courseSelection === 'Drinks' ? 'What to drink' : 'What to eat'}</Button>
        <Text>Location</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button>Philadelphia</Button>
          <Button>New York</Button>
        </View>
        <Text>Price Range</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button>$</Button>
          <Button>$$</Button>
          <Button>$$$</Button>
          <Button>$$$$</Button>
        </View>
        <Text>Category</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button>American</Button>
          <Button>Korean</Button>
          <Button>Chinese</Button>
        </View>
        <View style={styles.horizontalButtonContainer}>
          <Button>Japanese</Button>
          <Button>Thai</Button>
          <Button>No Pref</Button>
        </View>
        <View style={styles.horizontalButtonContainer}>
          <Button>Italian</Button>
          <Button>Jamaican</Button>
          <Button>Indian</Button>
        </View>
        <View style={styles.horizontalButtonContainer}>
          <Button>Latin American</Button>
          <Button>Mexican</Button>
        </View>
        <Text>Category</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button>Burger</Button>
          <Button>Cheesesteak</Button>
          <Button>Steak</Button>
        </View>
        <View style={styles.horizontalButtonContainer}>
          <Button>Hot pot</Button>
          <Button>Noodles</Button>
          <Button>Dimsum</Button>
        </View>
        <View style={styles.horizontalButtonContainer}>
          <Button>Sushi</Button>
          <Button>Ramen</Button>
          <Button>Bar</Button>
        </View>
      </ScrollView>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  horizontalButtonContainer: {
    flexDirection: 'row',
  }
})