import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { FilterProps } from './filterProps';

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

export const FindMainCourse: React.FC<FilterProps> = ({ foodFilters, setFoodFilters }): JSX.Element => {
  const [dollarSigns, setDollarSigns] = useState(5);

  const clearFilters = () => {
    setDollarSigns(5);
    setFoodFilters([]);
  }

  const cuisineTypeButton = (cuisine: string): JSX.Element => {
    return (
      <>
        {foodFilters.includes(cuisine) ?
          <Button mode='contained' onPress={() => setFoodFilters(foodFilters.filter((n) => { return n !== cuisine }))}>{cuisine}</Button>
          :
          <Button mode='text' onPress={() => setFoodFilters([...foodFilters, cuisine])}>{cuisine}</Button>
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
        <Button onPress={() => setFoodFilters([])} mode={foodFilters.length > 0 ? 'text' : 'contained'}>No Pref</Button>
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