import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-paper';
import LottieView from 'lottie-react-native';

import { SafeArea } from '../../components/utility/safe.area.component';
import { spacer } from '../../components/styles/stylesheet';
import { FindMainCourse } from './components/main-course.component';
import { mealTypeList, MealType } from '../../categories/mealOptions';
import { AuthContext } from '../../services/authentification/firebase-auth';
import { RestaurantDetail } from '../../categories/restaurantDetails';
import { colorTheme } from '../../components/styles/theme';

export const WhatToEat = (): JSX.Element => {
  const { savedRestaurants } = useContext(AuthContext);

  const [courseSelection, setCourseSelection] = useState<MealType>(MealType.MAIN);
  const [selectedLocation, setSelectedLocation] = useState('Philadelphia');
  const [hasAlcohol, setHasAlcohol] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetail | null>(null);
  const [cuisineFilter, setCuisineFilters] = useState<string[]>([]);
  const [dollarSigns, setDollarSigns] = useState(5);

  const chooseRestaurant = () => {
    let filteredRestaurants: RestaurantDetail[] = [];

    if (cuisineFilter.length > 0) {
      filteredRestaurants = savedRestaurants.filter((restaurant: RestaurantDetail) =>
        restaurant.location === selectedLocation && restaurant.courseType.includes(courseSelection) && restaurant.category.some(cat => cuisineFilter.includes(cat)) && restaurant.dollarSigns <= dollarSigns
      );
    } else {
      filteredRestaurants = savedRestaurants.filter((restaurant: RestaurantDetail) =>
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
              color={courseSelection === courseType ? colorTheme.midnightGreen : 'orange'}
              onPress={() => changeCourse(courseType)}
            >
              {courseType}
            </Button>
          )}
        </View>
        {selectedRestaurant ?
          <Card>
            <Text style={styles.cardTitle}>{selectedRestaurant.name}</Text>
            <Card.Content>
              <Text>{'$'.repeat(selectedRestaurant.dollarSigns)}</Text>
              {selectedRestaurant.recommendedDishes ?
                <>
                  <Text>Recommended Dishes: </Text>
                  {selectedRestaurant.recommendedDishes.length > 0 && <Text>1. {selectedRestaurant.recommendedDishes[0]}</Text>}
                  {selectedRestaurant.recommendedDishes.length > 1 && <Text>2. {selectedRestaurant.recommendedDishes[1]}</Text>}
                  {selectedRestaurant.recommendedDishes.length > 2 && <Text>3. {selectedRestaurant.recommendedDishes[2]}</Text>}
                </>
                :
                null
              }
              <Button color={colorTheme.midnightGreen} onPress={() => Linking.openURL(`https://www.google.com/search?q=${selectedRestaurant.name}`)}>Find Location</Button>
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
        <View style={spacer.xs} />
        <Button color={colorTheme.midnightGreen} mode='contained' onPress={() => chooseRestaurant()}>{selectedRestaurant ? 'Try again' : courseSelection === 'Drinks' ? 'What to drink' : 'What to eat'}</Button>
        <View style={spacer.xs} />
        <Text>Location</Text>
        <View style={spacer.xs} />
        <View style={styles.horizontalButtonContainer}>
          <View style={{ flex: 1 }}>
            <Button
              color={colorTheme.midnightGreen}
              onPress={() => changeLocation('Philadelphia')} mode={selectedLocation === 'Philadelphia' ? 'contained' : 'text'}
            >
              Philadelphia
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              color={colorTheme.midnightGreen}
              onPress={() => changeLocation('New York')} mode={selectedLocation === 'New York' ? 'contained' : 'text'}
            >
              New York
            </Button>
          </View>
        </View>
        <View style={spacer.xs} />
        {courseSelection === 'Drinks' ?
          <View style={styles.horizontalButtonContainer}>
            <View style={{ flex: 1 }}>
              <Button color={colorTheme.midnightGreen} onPress={() => setHasAlcohol(true)} mode={hasAlcohol ? 'contained' : 'text'}>Alcoholic</Button>
            </View>
            <View style={{ flex: 1 }}>
              <Button color={colorTheme.midnightGreen} onPress={() => setHasAlcohol(false)} mode={hasAlcohol ? 'text' : 'contained'}>Non-Alcoholic</Button>
            </View>
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
    paddingTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  animationView: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignSelf: 'center'
  },
})