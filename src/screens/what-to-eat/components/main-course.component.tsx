import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

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

interface FilterProps {
  cuisineFilter: string[],
  setCuisineFilters: React.Dispatch<React.SetStateAction<string[]>>
}

export const FindMainCourse: React.FC<FilterProps> = ({ cuisineFilter, setCuisineFilters }): JSX.Element => {
  const [dollarSigns, setDollarSigns] = useState(5);

  const clearFilters = () => {
    setDollarSigns(5);
    setCuisineFilters([]);
  }

  const cuisineTypeButton = (cuisine: string): JSX.Element => {
    return (
      <>
        {cuisineFilter.includes(cuisine) ?
          <Button mode='contained' onPress={() => setCuisineFilters(cuisineFilter.filter((n) => { return n !== cuisine }))}>{cuisine}</Button>
          :
          <Button mode='text' onPress={() => setCuisineFilters([...cuisineFilter, cuisine])}>{cuisine}</Button>
        }
      </>
    )
  }

  const foodTypeButtons = (food: string): JSX.Element | undefined => {
    switch (food) {
      case CuisineType.AMERICAN:
        return <View style={styles.horizontalButtonContainer}>
          {cuisineTypeButton('Burger')}
          {cuisineTypeButton('CheeseSteak')}
          {cuisineTypeButton('Steak')}
        </View>
      case CuisineType.CHINESE:
        return <View style={styles.horizontalButtonContainer}>
          {cuisineTypeButton('Hot Pot')}
          {cuisineTypeButton('Szechuan')}
        </View>
      case CuisineType.KOREAN:
        return <View style={styles.horizontalButtonContainer}>
          {cuisineTypeButton('KBBQ')}
          {cuisineTypeButton('Soft Tofu')}
          {cuisineTypeButton('Steak')}
        </View>
      default:
        break;
    }
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
        <Button onPress={() => setCuisineFilters([])} mode={cuisineFilter.length > 0 ? 'text' : 'contained'}>No Pref</Button>
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