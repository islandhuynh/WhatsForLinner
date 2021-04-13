import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';

const XcuisineType = {
  American: ["Burgers", "Cheesesteak", "Steak", "BBQ"],
  Chinese: ["Hot Pot", "Szechuan"],
  Indian: [],
  Italian: [],
  Japanese: ["Ramen", "Sushi"],
  Korean: ["Soft Tofu", "KBBQ"],
  LatinAmerican: [],
  Mexican: ["Tacos"]
}

enum CuisineType {
  AMERICAN = "American",
  CHINESE = "Chinese",
  INDIAN = "Indian",
  ITALIAN = "Italian",
  JAPANESE = "Japanese",
  KOREAN = "Korean",
  LATIN_AMERICAN = "LatinAmerican",
  MEXICAN = "Mexican"
}


export const FindMainCourse = (): JSX.Element => {
  const [dollarSigns, setDollarSigns] = useState(5);
  const [selectedCuisineTypes, setSelectedCuisineTypes] = useState<string[]>([]);

  // filters full list by "Main course"

  // What to eat button should be here? 

  const clearFilters = () => {
    setDollarSigns(5);
  }

  const cuisineTypeButton = (cuisine: CuisineType): JSX.Element => {
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
        {cuisineTypeButton(CuisineType.KOREAN)}
        {cuisineTypeButton(CuisineType.CHINESE)}
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
      <Text>Food</Text>
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