import React, { useState, useContext } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { populateButtons } from '../../functions/populateButtons';
import { styles } from '../../components/styles/stylesheet';

import { mealTypeList, cuisineTypeList, CuisineType } from '../../categories/mealOptions';
import { LocationOptions } from '../../categories/locationOptions';
import { RestaurantDetail } from '../../categories/restaurantDetails';

import { ErrorTypes } from '../../categories/errors';
import { AuthContext } from '../../services/authentification/firebase-auth';

interface NewResProps {
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AddNewRestaurantForm: React.FC<NewResProps> = ({ setModalVisibility }): JSX.Element => {
  const { savedRestaurants, setSavedRestaurants } = useContext(AuthContext);

  const [newResName, setNewResName] = useState('');
  const [newResLocation, setNewResLocation] = useState(LocationOptions.PHILADELPHIA);
  const [newResPriceTag, setNewResPriceTag] = useState(1);
  const [newResCourseType, setNewResCourseType] = useState<string[]>([]);
  const [newResHasAlc, setNewResHasAlc] = useState(false);
  const [newCuisineTypes, setNewCuisineTypes] = useState<string[]>([]);
  const [firstRecommendedDish, setFirstRecommendedDish] = useState<string>('');
  const [secondRecommendedDish, setSecondRecommendedDish] = useState<string>('');
  const [thirdRecommendedDish, setThirdRecommendedDish] = useState<string>('');

  const [formError, setFormError] = useState<ErrorTypes | undefined>(undefined);

  const clearFields = (): void => {
    setNewResName('');
    setNewResLocation(LocationOptions.PHILADELPHIA);
    setNewResPriceTag(1);
    setNewResCourseType([]);
    setNewResHasAlc(false);
    setNewCuisineTypes([]);
    setFormError(undefined);
    setFirstRecommendedDish('');
    setSecondRecommendedDish('');
    setThirdRecommendedDish('');
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

    if (savedRestaurants.some((restaurant: RestaurantDetail) => restaurant.name.toLowerCase() === newResName.toLowerCase())) {
      setFormError(ErrorTypes.RESTAURANT_ALREADY_EXIST);
    } else {
      let newRestaurant: RestaurantDetail = {
        name: newResName,
        location: newResLocation,
        courseType: newResCourseType,
        dollarSigns: newResPriceTag,
        category: newCuisineTypes,
        dishes: [],
        recommendedDishes: [
          firstRecommendedDish,
          secondRecommendedDish,
          thirdRecommendedDish
        ],
        hasAlcohol: newResHasAlc,
      }

      setSavedRestaurants([...savedRestaurants, newRestaurant]);
      setModalVisibility(false);
      clearFields();
    }
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
    <>
      <ScrollView style={styles.modalView}>
        <Text>Test Restaurant</Text>
        <TextInput mode="outlined" label="Restaurant name" value={newResName} onChangeText={name => setNewResName(name)} />
        {formError === ErrorTypes.EMPTY_TEXT_INPUT ? <Text style={styles.errorText}>Please Enter a restaurant name</Text> : null}
        {formError === ErrorTypes.RESTAURANT_ALREADY_EXIST ? <Text style={styles.errorText}>Restaurant Already Exist</Text> : null}
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
        {formError === ErrorTypes.NO_COURSE_SELECTION ? <Text style={styles.errorText}>Please select at least one course type</Text> : null}
        <Text>Cusine Type</Text>
        {populateButtons(cuisineTypeList, newRestaurantCuisineButton)}
        <Text>Has Alcohol?</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button onPress={() => setNewResHasAlc(true)} mode={newResHasAlc ? 'contained' : 'text'}>Yes</Button>
          <Button onPress={() => setNewResHasAlc(false)} mode={newResHasAlc ? 'text' : 'contained'}>No</Button>
        </View>
        <TextInput mode="outlined" label="Recommended Dishes #1" value={firstRecommendedDish} onChangeText={v => setFirstRecommendedDish(v)} />
        <TextInput mode="outlined" label="Recommended Dishes #2" value={secondRecommendedDish} onChangeText={v => setSecondRecommendedDish(v)} />
        <TextInput mode="outlined" label="Recommended Dishes #3" value={thirdRecommendedDish} onChangeText={v => setThirdRecommendedDish(v)} />
        <Button onPress={() => setModalVisibility(false)} mode="contained">close</Button>
        <Button onPress={() => addRestaurant()} mode="contained">add restaurant</Button>
        <Button onPress={() => clearFields()} mode="contained">reset fields</Button>
      </ScrollView>
    </>
  )
}