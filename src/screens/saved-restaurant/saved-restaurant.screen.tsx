import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Modal } from 'react-native';
import { List, Button, TextInput } from 'react-native-paper';

import { SafeArea } from '../../components/utility/safe.area.component';

import { populateButtons } from '../../functions/populateButtons';

import { mealTypeList, MealType, cuisineTypeList, CuisineType } from '../../categories/mealOptions';
import { LocationOptions } from '../../categories/locationOptions';
import { RestaurantDetail } from '../../categories/restaurantDetails';

import { savedRestaurants } from '../../../mock/Restaurants.mock';

import { ErrorTypes } from '../../categories/errors';

export const SavedRestaurants = (): JSX.Element => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  // should have a function that renders either new restaurant or folder input
  const [restaurantList, setRestaurantList] = useState(savedRestaurants);

  const [newResName, setNewResName] = useState('');
  const [newResLocation, setNewResLocation] = useState(LocationOptions.PHILADELPHIA);
  const [newResPriceTag, setNewResPriceTag] = useState(1);
  const [newResCourseType, setNewResCourseType] = useState<string[]>([]);
  const [newResHasAlc, setNewResHasAlc] = useState(false);
  const [newCuisineTypes, setNewCuisineTypes] = useState<string[]>([]);
  const [recommendedDishes, setRecommendedDishes] = useState<string[]>([]);

  const [formError, setFormError] = useState<ErrorTypes | undefined>(undefined);

  const clearFields = (): void => {
    setNewResName('');
    setNewResLocation(LocationOptions.PHILADELPHIA);
    setNewResPriceTag(1);
    setNewResCourseType([]);
    setNewResHasAlc(false);
    setNewCuisineTypes([]);
    setFormError(undefined);
  }

  const addRestaurant = (): void => {
    if (!newResName) {
      setFormError(ErrorTypes.EMPTY_TEXT_INPUT);
      return;
    }

    if (newResCourseType.length === 0) {
      setFormError(ErrorTypes.NO_COURSE_SELECTION);
      return;
    }

    if (checkDuplicateRestaurant()) {
      setFormError(ErrorTypes.RESTAURANT_ALREADY_EXIST);
      return;
    } else {
      let newRestaurant: RestaurantDetail = {
        name: newResName,
        location: newResLocation,
        courseType: newResCourseType,
        dollarSigns: newResPriceTag,
        category: newCuisineTypes,
        dishes: [],
        recommendedDishes: recommendedDishes,
        hasAlcohol: newResHasAlc,
      }

      setRestaurantList([...restaurantList, newRestaurant]);
      setModalVisibility(false);
      clearFields();
    }
  }

  const checkDuplicateRestaurant = (): boolean => {
    if (restaurantList.some(restaurant => restaurant.name.toLowerCase() === newResName.toLowerCase())) {
      return true;
    }

    return false;
  }

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

  const selectCourseTypeButton = (courseType: string): JSX.Element => {
    return (
      <>
        {newResCourseType.includes(courseType) ?
          <Button mode='contained' onPress={() => setNewResCourseType(newResCourseType.filter((n) => { return n !== courseType }))}>{courseType}</Button>
          :
          <Button mode='text' onPress={() => setNewResCourseType([...newResCourseType, courseType])}>{courseType}</Button>
        }
      </>
    )
  }

  return (
    <SafeArea>
      <ScrollView>
        <Modal visible={modalVisibility} transparent={true} >
          <ScrollView style={styles.modalView}>
            <Text>Add Restaurant</Text>
            <TextInput mode="outlined" label="Restaurant name" value={newResName} onChangeText={name => setNewResName(name)} />
            {formError === ErrorTypes.EMPTY_TEXT_INPUT ? <Text>Please Enter a restaurant name</Text> : null}
            {formError === ErrorTypes.RESTAURANT_ALREADY_EXIST ? <Text>Restaurant Already Exist</Text> : null}
            <Text>Location</Text>
            <View style={styles.horizontalButtonContainer}>
              <Button
                mode={newResLocation === LocationOptions.PHILADELPHIA ? 'contained' : 'text'}
                onPress={() => setNewResLocation(LocationOptions.PHILADELPHIA)}
              >
                {LocationOptions.PHILADELPHIA}
              </Button>
              <Button
                mode={newResLocation === LocationOptions.NEW_YORK ? 'contained' : 'text'}
                onPress={() => setNewResLocation(LocationOptions.NEW_YORK)}
              >
                {LocationOptions.NEW_YORK}
              </Button>
            </View>
            <Text>Price</Text>
            <View style={styles.horizontalButtonContainer}>
              <Button onPress={() => setNewResPriceTag(1)} color={newResPriceTag === 1 ? 'blue' : 'black'}>$</Button>
              <Button onPress={() => setNewResPriceTag(2)} color={newResPriceTag === 2 ? 'blue' : 'black'}>$$</Button>
              <Button onPress={() => setNewResPriceTag(3)} color={newResPriceTag === 3 ? 'blue' : 'black'}>$$$</Button>
              <Button onPress={() => setNewResPriceTag(4)} color={newResPriceTag === 4 ? 'blue' : 'black'}>$$$$</Button>
            </View>
            <Text>Course Type</Text>
            <View style={styles.horizontalButtonContainer}>
              {populateButtons(mealTypeList, selectCourseTypeButton)}
            </View>
            {formError === ErrorTypes.NO_COURSE_SELECTION ? <Text>Please select at least one course type</Text> : null}
            <Text>Cusine Type</Text>
            {populateButtons(cuisineTypeList, newRestaurantCuisineButton)}
            <Text>Has Alcohol?</Text>
            <View style={styles.horizontalButtonContainer}>
              <Button onPress={() => setNewResHasAlc(true)} mode={newResHasAlc ? 'contained' : 'text'}>Yes</Button>
              <Button onPress={() => setNewResHasAlc(false)} mode={newResHasAlc ? 'text' : 'contained'}>No</Button>
            </View>
            {/* <TextInput mode="outlined" label="Recommended Dishes #1" />
            <TextInput mode="outlined" label="Recommended Dishes #2" />
            <TextInput mode="outlined" label="Recommended Dishes #3" /> */}
            <Button onPress={() => setModalVisibility(false)} mode="contained">close</Button>
            <Button onPress={() => addRestaurant()} mode="contained">add restaurant</Button>
            <Button onPress={() => clearFields()} mode="contained">reset fields</Button>
          </ScrollView>
        </Modal>
        <List.Section>
          <List.Accordion title="Main Courses" left={props => <List.Icon {...props} icon="food" />}>
            {restaurantList.map(restaurant => restaurant.courseType.includes(MealType.MAIN) ?
              <List.Item key={restaurant.name + '-Main'} title={restaurant.name} right={props => <List.Icon {...props} icon="playlist-edit" />} />
              :
              null
            )}
          </List.Accordion>
          <List.Accordion title="Desserts" left={props => <List.Icon {...props} icon="cake" />}>
            {restaurantList.map(restaurant => restaurant.courseType.includes(MealType.DESSERT) ?
              <List.Item key={restaurant.name + '-Dessert'} title={restaurant.name} right={props => <List.Icon {...props} icon="playlist-edit" />} />
              :
              null
            )}
          </List.Accordion>
          <List.Accordion title="Drinks" left={props => <List.Icon {...props} icon="glass-cocktail" />}>
            {restaurantList.map(restaurant => restaurant.courseType.includes(MealType.DRINKS) ?
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