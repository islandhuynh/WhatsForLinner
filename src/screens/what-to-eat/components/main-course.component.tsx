import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';

import { savedRestaurants } from '../../../../mock/Restaurants.mock';

enum CuisineType {
  AMERICAN = "American",
  CHINESE = "Chinese",
  INDIAN = "Indian",
  ITALIAN = "Italian",
  JAPANESE = "Japanese",
  KOREAN = "Korean",
  LATIN_AMERICAN = "Latin American",
  MEXICAN = "Mexican",
}


export const FindMainCourse = (): JSX.Element => {
  const [dollarSigns, setDollarSigns] = useState(5);
  const [selectedCuisineTypes, setSelectedCuisineTypes] = useState<string[]>([]);

  // filters full list by "Main course"

  // What to eat button should be here? 

  const clearFilters = () => {
    setDollarSigns(5);
    setSelectedCuisineTypes([]);
  }

  const cuisineTypeButton = (cuisine: string): JSX.Element => {
    return (
      <>
        {selectedCuisineTypes.includes(cuisine) ?
          <Button mode='contained' onPress={() => setSelectedCuisineTypes(selectedCuisineTypes.filter((n) => { return n !== cuisine }))}>{cuisine}</Button>
          :
          <Button mode='text' onPress={() => setSelectedCuisineTypes([...selectedCuisineTypes, cuisine])}>{cuisine}</Button>
        }
      </>
    )
  }

  return (
    <>
      <Text>Price Range (Set Max)</Text>
      <View style={styles.horizontalButtonContainer}>
        <Button onPress={() => setDollarSigns(1)} color={dollarSigns === 1 ? 'blue' : 'black'}>$</Button>
        <Button onPress={() => setDollarSigns(2)} color={dollarSigns === 2 ? 'blue' : 'black'}>$$</Button>
        <Button onPress={() => setDollarSigns(3)} color={dollarSigns === 3 ? 'blue' : 'black'}>$$$</Button>
        <Button onPress={() => setDollarSigns(4)} color={dollarSigns === 4 ? 'blue' : 'black'}>$$$$</Button>
      </View>
      <Text>Cuisine Type</Text>
      <View style={styles.horizontalButtonContainer}>
        {cuisineTypeButton(CuisineType.AMERICAN)}
        {cuisineTypeButton(CuisineType.CHINESE)}
        {cuisineTypeButton(CuisineType.INDIAN)}
      </View>
      <View style={styles.horizontalButtonContainer}>
        {cuisineTypeButton(CuisineType.ITALIAN)}
        {cuisineTypeButton(CuisineType.JAPANESE)}
        {cuisineTypeButton(CuisineType.KOREAN)}
      </View>
      <View style={styles.horizontalButtonContainer}>
        {cuisineTypeButton(CuisineType.LATIN_AMERICAN)}
        {cuisineTypeButton(CuisineType.MEXICAN)}
        <Button onPress={() => setSelectedCuisineTypes([])} mode={selectedCuisineTypes.length > 0 ? 'text' : 'contained'}>No Pref</Button>
      </View>
      <Button mode='contained' onPress={() => clearFilters()}>Clear Filters</Button>
    </>
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