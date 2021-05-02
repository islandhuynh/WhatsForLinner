import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { CuisineType, cuisineTypeList } from '../../../categories/mealOptions';
import { populateButtons } from '../../../functions/populateButtons';
import { spacer, styles } from '../../../components/styles/stylesheet';
import { colorTheme } from '../../../components/styles/theme';

interface FilterProps {
  cuisineFilter: string[],
  setCuisineFilters: React.Dispatch<React.SetStateAction<string[]>>,
  dollarSigns: number,
  setDollarSigns: React.Dispatch<React.SetStateAction<number>>,
  clearFilters: () => void
}

export const FindMainCourse: React.FC<FilterProps> = ({ cuisineFilter, setCuisineFilters, dollarSigns, setDollarSigns, clearFilters }): JSX.Element => {

  const cuisineTypeButton = (cuisine: string): JSX.Element => {
    if (cuisine === CuisineType.NO_PREF) {
      return <Button color={colorTheme.midnightGreen} onPress={() => setCuisineFilters([])} mode={cuisineFilter.length > 0 ? 'text' : 'contained'}>No Pref</Button>
    } else {
      return (
        <>
          {cuisineFilter.includes(cuisine) ?
            <Button color={colorTheme.midnightGreen} mode='contained' onPress={() => setCuisineFilters(cuisineFilter.filter((n) => { return n !== cuisine }))}>{cuisine}</Button>
            :
            <Button color={colorTheme.midnightGreen} mode='text' onPress={() => setCuisineFilters([...cuisineFilter, cuisine])}>{cuisine}</Button>
          }
        </>
      )
    }
  }

  return (
    <>
      <Text>Price Range (Set Max)</Text>
      <View style={styles.horizontalButtonContainer}>
        <Button onPress={() => setDollarSigns(1)} color={dollarSigns === 1 ? colorTheme.midnightGreen : 'black'}>$</Button>
        <Button onPress={() => setDollarSigns(2)} color={dollarSigns === 2 ? colorTheme.midnightGreen : 'black'}>$$</Button>
        <Button onPress={() => setDollarSigns(3)} color={dollarSigns === 3 ? colorTheme.midnightGreen : 'black'}>$$$</Button>
        <Button onPress={() => setDollarSigns(4)} color={dollarSigns === 4 ? colorTheme.midnightGreen : 'black'}>$$$$</Button>
      </View>
      <Text>Cuisine Type</Text>
      {populateButtons(cuisineTypeList, cuisineTypeButton)}
      <View style={spacer.small} />
      <Button color={colorTheme.midnightGreen} mode='contained' onPress={() => clearFilters()}>Clear Filters</Button>
    </>
  )
}