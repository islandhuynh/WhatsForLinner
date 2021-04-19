import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';
import LottieView from 'lottie-react-native';

import { SafeArea } from '../../components/utility/safe.area.component';

import { savedRestaurants } from '../../../mock/Restaurants.mock';
import { FindMainCourse } from './components/main-course.component';
import { mealTypeList, MealType } from '../../categories/mealOptions';

interface RestaurantDetail {
  name: string,
  courseType: string[],
  dollarSigns: number,
  category: string[]
}

export const WhatToEat = (): JSX.Element => {
  const [courseSelection, setCourseSelection] = useState<MealType>(MealType.MAIN);
  const [selectedLocation, setSelectedLocation] = useState('Philadelphia');
  const [hasAlcohol, setHasAlcohol] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetail | null>(null);
  const [cuisineFilter, setCuisineFilters] = useState<string[]>([]);
  const [dollarSigns, setDollarSigns] = useState(5);

  const chooseRestaurant = () => {
    let filteredRestaurants = undefined;

    if (cuisineFilter.length > 0) {
      filteredRestaurants = savedRestaurants.filter(restaurant =>
        restaurant.location === selectedLocation && restaurant.courseType.includes(courseSelection) && restaurant.category.some(cat => cuisineFilter.includes(cat)) && restaurant.dollarSigns <= dollarSigns
      );
    } else {
      filteredRestaurants = savedRestaurants.filter(restaurant =>
        restaurant.location === selectedLocation && restaurant.courseType.includes(courseSelection) && restaurant.dollarSigns <= dollarSigns
      );
    }

    if (courseSelection === 'Drinks') {
      filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.hasAlcohol === hasAlcohol);
    }

    const randomInt = Math.floor(Math.random() * filteredRestaurants.length);
    setSelectedRestaurant(filteredRestaurants[randomInt]);
  }

  const clearFilters = () => {
    setSelectedRestaurant(null);
    setDollarSigns(5);
    setCuisineFilters([]);
    setHasAlcohol(false);
  }

  const changeCourse = (courseType: MealType) => {
    if (courseType !== courseSelection) {
      setCourseSelection(courseType);
      clearFilters();
    }
  }

  const changeLocation = (loc: string) => {
    setSelectedLocation(loc);
  }

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        <View style={styles.horizontalButtonContainer}>
          {mealTypeList.map(courseType =>
            <Button
              key={courseType}
              color={courseSelection === courseType ? 'blue' : 'purple'}
              onPress={() => changeCourse(courseType)}
            >
              {courseType}
            </Button>
          )}
        </View>
        {selectedRestaurant ?
          <Card>
            <Card.Title title={selectedRestaurant.name} titleStyle={styles.cardTitle} />
            <Card.Content>
              <Paragraph>{selectedRestaurant.dollarSigns}</Paragraph>
              <Paragraph onPress={() => Linking.openURL(`https://www.google.com/search?q=${selectedRestaurant.name}`)}>Find Location</Paragraph>
            </Card.Content>
          </Card>
          :
          <LottieView
            key="animation"
            autoPlay
            loop
            resizeMode="cover"
            style={styles.animationView}
            source={courseSelection === MealType.MAIN ?
              require('../../../assets/lottie/43995-burger.json')
              :
              courseSelection === MealType.DESSERT ?
                require('../../../assets/lottie/6674-cake.json')
                :
                require('../../../assets/lottie/4881-milkshake.json')
            }
          />
        }
        <Button mode='contained' onPress={() => chooseRestaurant()}>{selectedRestaurant ? 'retry' : courseSelection === 'Drinks' ? 'What to drink' : 'What to eat'}</Button>
        <Text>Location</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button onPress={() => changeLocation('Philadelphia')} mode={selectedLocation === 'Philadelphia' ? 'contained' : 'text'}>Philadelphia</Button>
          <Button onPress={() => changeLocation('New York')} mode={selectedLocation === 'New York' ? 'contained' : 'text'}>New York</Button>
        </View>
        {courseSelection === 'Drinks' ?
          <View style={styles.horizontalButtonContainer}>
            <Button onPress={() => setHasAlcohol(true)} mode={hasAlcohol ? 'contained' : 'text'}>Alcoholic</Button>
            <Button onPress={() => setHasAlcohol(false)} mode={hasAlcohol ? 'text' : 'contained'}>Non-Alcoholic</Button>
          </View>
          :
          null
        }
        {courseSelection === 'Main' ?
          <FindMainCourse
            cuisineFilter={cuisineFilter}
            setCuisineFilters={setCuisineFilters}
            dollarSigns={dollarSigns}
            setDollarSigns={setDollarSigns}
            clearFilters={clearFilters}
          />
          :
          null
        }
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
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'left'
  },
  animationView: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignSelf: 'center'
  },
})