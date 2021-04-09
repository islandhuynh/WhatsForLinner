import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
      <View style={styles.container}>
        <View style={styles.mealButtonContainer}>
          <Button color={courseSelection === 'Main' ? 'blue' : 'purple'} onPress={() => changeCourse('Main')}>
            Main
          </Button>
          <Button color={courseSelection === 'Dessert' ? 'blue' : 'purple'} onPress={() => changeCourse('Dessert')}>Dessert</Button>
          <Button color={courseSelection === 'Drinks' ? 'blue' : 'purple'} onPress={() => changeCourse('Drinks')}>Drinks</Button>
        </View>
        {selectedRestaurant ?
          <Card>
            <Card.Title title={selectedRestaurant.name} />
            <Card.Content>
              <Paragraph>{selectedRestaurant.dollarSigns}</Paragraph>
            </Card.Content>
          </Card>
          :
          <Text>Click on the button below to know what to eat</Text>
        }
        <Button onPress={() => chooseRestaurant()}>{courseSelection === 'Drinks' ? 'What to drink' : 'What to eat'}</Button>
      </View>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  mealButtonContainer: {
    flexDirection: 'row',
  },
  courseButton: {
    color: 'blue'
  },
  selectedCourseButton: {
    color: 'red'
  }
})