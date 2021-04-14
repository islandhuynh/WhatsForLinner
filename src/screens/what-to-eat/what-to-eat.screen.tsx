import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';

import { SafeArea } from '../../components/utility/safe.area.component';

import { savedRestaurants } from '../../../mock/Restaurants.mock';
import { FindMainCourse } from './components/main-course.component';

interface RestaurantDetail {
  name: string,
  courseType: string[],
  dollarSigns: number,
  category: string[]
}

export const WhatToEat = (): JSX.Element => {
  // defaults to main course upon start
  const [courseSelection, setCourseSelection] = useState('Main');
  const [selectedLocation, setSelectedLocation] = useState('Philadelphia');
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetail | null>(null);
  const [foodFilters, setFoodFilters] = useState<string[]>([]);

  const chooseRestaurant = () => {
    let filteredRestaurants = undefined;

    if (foodFilters.length > 0) {
      filteredRestaurants = savedRestaurants.filter(restaurant =>
        restaurant.location === selectedLocation && restaurant.courseType.includes(courseSelection) && restaurant.category.some(cat => foodFilters.includes(cat))
      );
    } else {
      filteredRestaurants = savedRestaurants.filter(restaurant =>
        restaurant.location === selectedLocation && restaurant.courseType.includes(courseSelection)
      );
    }

    console.log(filteredRestaurants.length);
    const randomInt = Math.floor(Math.random() * filteredRestaurants.length);
    setSelectedRestaurant(filteredRestaurants[randomInt]);
  }

  const changeCourse = (courseType: string) => {
    if (courseType !== courseSelection) {
      setCourseSelection(courseType);
      setSelectedRestaurant(null);
      setFoodFilters([]);
    }
  }

  const changeLocation = (loc: string) => {
    setSelectedLocation(loc);
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
              <Paragraph onPress={() => Linking.openURL(`https://www.google.com/search?q=${selectedRestaurant.name}`)}>Find Location</Paragraph>
            </Card.Content>
          </Card>
          :
          <Text>Click on the button below to know what to eat</Text>
        }
        <Button mode='contained' onPress={() => chooseRestaurant()}>{courseSelection === 'Drinks' ? 'What to drink' : 'What to eat'}</Button>
        <Text>Location</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button onPress={() => changeLocation('Philadelphia')} mode={selectedLocation === 'Philadelphia' ? 'contained' : 'text'}>Philadelphia</Button>
          <Button onPress={() => changeLocation('New York')} mode={selectedLocation === 'New York' ? 'contained' : 'text'}>New York</Button>
        </View>
        {courseSelection === 'Main' ? <FindMainCourse foodFilters={foodFilters} setFoodFilters={setFoodFilters} /> : null}
        <Button onPress={() => console.log(foodFilters)}>Check for Filters</Button>
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