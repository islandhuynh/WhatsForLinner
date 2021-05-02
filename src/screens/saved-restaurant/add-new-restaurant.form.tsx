import React, { useState, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { populateButtons } from '../../functions/populateButtons';
import { styles } from '../../components/styles/stylesheet';

import { mealTypeList, cuisineTypeList, CuisineType } from '../../categories/mealOptions';
import { LocationOptions } from '../../categories/locationOptions';
import { RestaurantDetail } from '../../categories/restaurantDetails';
import { colorTheme } from '../../components/styles/theme';

import { ErrorTypes } from '../../categories/errors';
import { AuthContext } from '../../services/authentification/firebase-auth';

interface NewResProps {
  setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AddNewRestaurantForm: React.FC<NewResProps> = ({ setModalVisibility }): JSX.Element => {
  const { savedRestaurants, updateRestaurantList, user } = useContext(AuthContext);

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

      updateRestaurantList(user.user!.uid, [...savedRestaurants, newRestaurant]);
      setModalVisibility(false);
      clearFields();
    }
  }

  const newRestaurantCuisineButton = (cuisine: string): JSX.Element => {
    if (cuisine === CuisineType.NO_PREF) {
      return <Button
        color={colorTheme.midnightGreen}
        mode={newCuisineTypes.length > 0 ? 'text' : 'contained'}
        onPress={() => setNewCuisineTypes([])}
      >
        Other
      </Button>
    } else {
      return (
        <>
          {newCuisineTypes.includes(cuisine) ?
            <Button
              color={colorTheme.midnightGreen}
              mode='contained'
              onPress={() => setNewCuisineTypes(newCuisineTypes.filter((n) => { return n !== cuisine }))}
            >
              {cuisine}
            </Button>
            :
            <Button
              color={colorTheme.midnightGreen}
              mode='text'
              onPress={() => setNewCuisineTypes([...newCuisineTypes, cuisine])}
            >
              {cuisine}
            </Button>
          }
        </>
      )
    }
  }

  const selectCourseTypeButton = (courseType: string): JSX.Element => {
    return (
      <>
        {newResCourseType.includes(courseType) ?
          <Button
            color={colorTheme.midnightGreen}
            mode='contained'
            onPress={() => setNewResCourseType(newResCourseType.filter((n) => { return n !== courseType }))}
          >
            {courseType}
          </Button>
          :
          <Button
            color={colorTheme.midnightGreen}
            mode='text'
            onPress={() => setNewResCourseType([...newResCourseType, courseType])}
          >
            {courseType}
          </Button>
        }
      </>
    )
  }

  return (
    <>
      <ScrollView style={styles.modalView}>
        <View style={addRestaurantStyles.topButtonContainer}>
          <View style={addRestaurantStyles.resetButton}>
            <Button color={colorTheme.midnightGreen} onPress={() => clearFields()}>reset fields</Button>
          </View>
          <View style={addRestaurantStyles.spacer}></View>
          <View style={addRestaurantStyles.buttonFlex}>
            <Button color={colorTheme.midnightGreen} onPress={() => setModalVisibility(false)}>close</Button>
          </View>
        </View>
        <TextInput theme={{ colors: { primary: colorTheme.midnightGreen } }} mode="outlined" label="Restaurant name" value={newResName} onChangeText={name => setNewResName(name)} />
        {formError === ErrorTypes.EMPTY_TEXT_INPUT ? <Text style={styles.errorText}>Please Enter a restaurant name</Text> : null}
        {formError === ErrorTypes.RESTAURANT_ALREADY_EXIST ? <Text style={styles.errorText}>Restaurant Already Exist</Text> : null}
        <Text>Location</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button
            color={colorTheme.midnightGreen}
            mode={newResLocation === LocationOptions.PHILADELPHIA ? 'contained' : 'text'}
            onPress={() => setNewResLocation(LocationOptions.PHILADELPHIA)}
          >
            {LocationOptions.PHILADELPHIA}
          </Button>
          <Button
            color={colorTheme.midnightGreen}
            mode={newResLocation === LocationOptions.NEW_YORK ? 'contained' : 'text'}
            onPress={() => setNewResLocation(LocationOptions.NEW_YORK)}
          >
            {LocationOptions.NEW_YORK}
          </Button>
        </View>
        <Text>Price</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button onPress={() => setNewResPriceTag(1)} color={newResPriceTag === 1 ? colorTheme.midnightGreen : 'black'}>$</Button>
          <Button onPress={() => setNewResPriceTag(2)} color={newResPriceTag === 2 ? colorTheme.midnightGreen : 'black'}>$$</Button>
          <Button onPress={() => setNewResPriceTag(3)} color={newResPriceTag === 3 ? colorTheme.midnightGreen : 'black'}>$$$</Button>
          <Button onPress={() => setNewResPriceTag(4)} color={newResPriceTag === 4 ? colorTheme.midnightGreen : 'black'}>$$$$</Button>
        </View>
        <Text>Course Type</Text>
        {populateButtons(mealTypeList, selectCourseTypeButton)}
        {formError === ErrorTypes.NO_COURSE_SELECTION ? <Text style={styles.errorText}>Please select at least one course type</Text> : null}
        <Text>Cusine Type</Text>
        {populateButtons(cuisineTypeList, newRestaurantCuisineButton)}
        <Text>Has Alcohol?</Text>
        <View style={styles.horizontalButtonContainer}>
          <Button color={colorTheme.midnightGreen} onPress={() => setNewResHasAlc(true)} mode={newResHasAlc ? 'contained' : 'text'}>Yes</Button>
          <Button color={colorTheme.midnightGreen} onPress={() => setNewResHasAlc(false)} mode={newResHasAlc ? 'text' : 'contained'}>No</Button>
        </View>
        <TextInput theme={{ colors: { primary: colorTheme.midnightGreen } }} mode="outlined" label="Recommended Dishes #1" value={firstRecommendedDish} onChangeText={v => setFirstRecommendedDish(v)} />
        <TextInput theme={{ colors: { primary: colorTheme.midnightGreen } }} mode="outlined" label="Recommended Dishes #2" value={secondRecommendedDish} onChangeText={v => setSecondRecommendedDish(v)} />
        <TextInput theme={{ colors: { primary: colorTheme.midnightGreen } }} mode="outlined" label="Recommended Dishes #3" value={thirdRecommendedDish} onChangeText={v => setThirdRecommendedDish(v)} />
        <View style={{ padding: 5 }}></View>
        <Button color={colorTheme.midnightGreen} onPress={() => addRestaurant()} mode="contained">add restaurant</Button>
      </ScrollView>
    </>
  )
}

const addRestaurantStyles = StyleSheet.create({
  topButtonContainer: {
    flexDirection: 'row',
  },
  buttonFlex: {
    flex: 1
  },
  spacer: {
    flex: 1
  },
  resetButton: {
    flex: 1.5
  }
})
