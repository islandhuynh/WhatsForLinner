import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Modal } from 'react-native';
import { List, Button, TextInput } from 'react-native-paper';

import { SafeArea } from '../../components/utility/safe.area.component';

import { populateButtons } from '../../functions/populateButtons';

import { MealType, cuisineTypeList, CuisineType } from '../../categories/mealOptions';
import { LocationOptions } from '../../categories/locationOptions';
import { RestaurantDetail } from '../../categories/restaurantDetails';

import { savedRestaurants } from '../../../mock/Restaurants.mock';

export const SavedRestaurants = (): JSX.Element => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  // should have a function that renders either new restaurant or folder input

  const [newRestaurant, setNewRestaurant] = useState({});
  const [newCuisineTypes, setNewCuisineTypes] = useState<string[]>([])

  const newRestaurantCuisineButton = (cuisine: string): JSX.Element => {
    if (cuisine === CuisineType.NO_PREF) {
      return <Button
        mode={newCuisineTypes.length > 0 ? 'text' : 'contained'}
        onPress={() => setNewCuisineTypes([])}
      >
        Other
        </Button>
    } else {
      return (
        <>
          {newCuisineTypes.includes(cuisine) ?
            <Button mode='contained' onPress={() => setNewCuisineTypes(newCuisineTypes.filter((n) => { return n !== cuisine }))}>{cuisine}</Button>
            :
            <Button mode='text' onPress={() => setNewCuisineTypes([...newCuisineTypes, cuisine])}>{cuisine}</Button>
          }
        </>
      )
    }
  }

  return (
    <SafeArea>
      <ScrollView>
        <Modal visible={modalVisibility} transparent={true} >
          <ScrollView style={styles.modalView}>
            <Text>Add Restaurant</Text>
            <TextInput mode="outlined" label="Restaurant name" />
            <Text>Location</Text>
            <View style={styles.horizontalButtonContainer}>
              <Button>{LocationOptions.PHILADELPHIA}</Button>
              <Button>{LocationOptions.NEW_YORK}</Button>
            </View>
            <Text>Price</Text>
            <View style={styles.horizontalButtonContainer}>
              <Button>$</Button>
              <Button>$$</Button>
              <Button>$$$</Button>
              <Button>$$$$</Button>
            </View>
            <Text>Course Type</Text>
            <View style={styles.horizontalButtonContainer}>
              <Button>{MealType.MAIN}</Button>
              <Button>{MealType.DESSERT}</Button>
              <Button>{MealType.DRINKS}</Button>
            </View>
            <Text>Cusine Type</Text>
            {populateButtons(cuisineTypeList, newRestaurantCuisineButton)}
            <Text>Has Alcohol?</Text>
            <View style={styles.horizontalButtonContainer}>
              <Button>Yes</Button>
              <Button>No</Button>
            </View>
            {/* <TextInput mode="outlined" label="Recommended Dishes #1" />
            <TextInput mode="outlined" label="Recommended Dishes #2" />
            <TextInput mode="outlined" label="Recommended Dishes #3" /> */}
            <Button onPress={() => setModalVisibility(false)} mode="contained">close</Button>
            <Button onPress={() => console.log(newCuisineTypes)} mode="contained">add restaurant</Button>
          </ScrollView>
        </Modal>
        <List.Section>
          <List.Accordion title="Main Courses" left={props => <List.Icon {...props} icon="food" />}>
            {savedRestaurants.map(restaurant => restaurant.courseType.includes(MealType.MAIN) ?
              <List.Item key={restaurant.name + '-Main'} title={restaurant.name} right={props => <List.Icon {...props} icon="playlist-edit" />} />
              :
              null
            )}
          </List.Accordion>
          <List.Accordion title="Desserts" left={props => <List.Icon {...props} icon="cake" />}>
            {savedRestaurants.map(restaurant => restaurant.courseType.includes(MealType.DESSERT) ?
              <List.Item key={restaurant.name + '-Dessert'} title={restaurant.name} right={props => <List.Icon {...props} icon="playlist-edit" />} />
              :
              null
            )}
          </List.Accordion>
          <List.Accordion title="Drinks" left={props => <List.Icon {...props} icon="glass-cocktail" />}>
            {savedRestaurants.map(restaurant => restaurant.courseType.includes(MealType.DRINKS) ?
              <List.Item key={restaurant.name + '-Drinks'} title={restaurant.name} right={props => <List.Icon {...props} icon="playlist-edit" />} />
              :
              null
            )}
          </List.Accordion>
        </List.Section>
        <View style={styles.horizontalButtonContainer}>
          <Button onPress={() => setModalVisibility(true)}>Add new Restaurant</Button>
          <Button onPress={() => setModalVisibility(true)}>Add new Folder</Button>
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
    justifyContent: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})