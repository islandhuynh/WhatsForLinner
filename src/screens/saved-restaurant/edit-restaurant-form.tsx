import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { styles } from '../../components/styles/stylesheet';
import { RestaurantDetail, emptyRestaurant } from '../../categories/restaurantDetails';
import { LocationOptions } from '../../categories/locationOptions';
import { populateButtons } from '../../functions/populateButtons';
import { mealTypeList, cuisineTypeList, CuisineType } from '../../categories/mealOptions';
import { AuthContext } from '../../services/authentification/firebase-auth';
import { colorTheme } from '../../components/styles/theme';

interface EditProps {
  selectedRestaurant: RestaurantDetail,
  setInfoCardVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
}

export const EditRestaurant: React.FC<EditProps> = ({
  selectedRestaurant,
  setInfoCardVisibility,
  setEditMode,
}): JSX.Element => {
  const { savedRestaurants, user, updateRestaurantList } = useContext(AuthContext);

  let selectedRestaurantIndex = savedRestaurants.indexOf(selectedRestaurant);

  const [newName, setNewName] = useState(selectedRestaurant.name);
  const [newCourseTypes, setNewCourseTypes] = useState(selectedRestaurant.courseType);
  const [newDollarSigns, setNewDollarSigns] = useState(selectedRestaurant.dollarSigns);
  const [newCategories, setNewCategories] = useState(selectedRestaurant.category);
  const [newDishes, setNewDishes] = useState(selectedRestaurant.dishes || []);
  const [firstRecommendedDish, setFirstRecommendedDish] = useState<string>(selectedRestaurant.recommendedDishes[0] || '');
  const [secondRecommendedDish, setSecondRecommendedDish] = useState<string>(selectedRestaurant.recommendedDishes[1] || '');
  const [thirdRecommendedDish, setThirdRecommendedDish] = useState<string>(selectedRestaurant.recommendedDishes[2] || '');
  const [changeHasAlc, setChangeHasAlc] = useState(selectedRestaurant.hasAlcohol);
  const [newLocation, setNewLocation] = useState(selectedRestaurant.location);

  const newRestaurantCuisineButton = (cuisine: string): JSX.Element => {
    if (cuisine === CuisineType.NO_PREF) {
      return <Button
        color={colorTheme.midnightGreen}
        mode={newCategories.length > 0 ? 'text' : 'contained'}
        onPress={() => setNewCategories([])}
      >
        Other
          </Button>
    } else {
      return (
        <>
          {newCategories.includes(cuisine) ?
            <Button color={colorTheme.midnightGreen} mode='contained' onPress={() => setNewCategories(newCategories.filter((n) => { return n !== cuisine }))}>{cuisine}</Button>
            :
            <Button color={colorTheme.midnightGreen} mode='text' onPress={() => setNewCategories([...newCategories, cuisine])}>{cuisine}</Button>
          }
        </>
      )
    }
  }

  const selectCourseTypeButton = (courseType: string): JSX.Element => {
    return (
      <>
        {newCourseTypes.includes(courseType) ?
          <Button
            color={colorTheme.midnightGreen}
            mode='contained'
            onPress={() => setNewCourseTypes(newCourseTypes.filter((n) => { return n !== courseType }))}
          >
            {courseType}
          </Button>
          :
          <Button color={colorTheme.midnightGreen} mode='text' onPress={() => setNewCourseTypes([...newCourseTypes, courseType])}>{courseType}</Button>
        }
      </>
    )
  }

  const submitChanges = () => {
    let editedRestaurant: RestaurantDetail = {
      name: newName,
      courseType: newCourseTypes,
      dollarSigns: newDollarSigns,
      category: newCategories,
      dishes: newDishes,
      recommendedDishes: [
        firstRecommendedDish,
        secondRecommendedDish,
        thirdRecommendedDish
      ],
      hasAlcohol: changeHasAlc,
      location: newLocation
    }

    let tempRestaurantList = savedRestaurants;

    tempRestaurantList[selectedRestaurantIndex] = editedRestaurant;

    updateRestaurantList(user.user!.uid, tempRestaurantList);

    setInfoCardVisibility(false);
  }

  return (
    <View style={styles.modalView}>
      <View style={editRestaurantStyles.topButtonContainer}>
        <View style={editRestaurantStyles.buttonFlex}>
          <Button color={colorTheme.midnightGreen} onPress={() => setEditMode(false)}>return</Button>
        </View>
        <View style={editRestaurantStyles.spacer}></View>
        <View style={editRestaurantStyles.buttonFlex}>
          <Button
            color={colorTheme.midnightGreen}
            onPress={() => {
              setInfoCardVisibility(false)
              setEditMode(false)
            }}
          >
            close
          </Button>
        </View>
      </View>
      <TextInput mode="outlined" label="Restaurant name" value={newName} onChangeText={name => setNewName(name)} />
      <Text>Location</Text>
      <View style={styles.horizontalButtonContainer}>
        <Button
          color={colorTheme.midnightGreen}
          mode={newLocation === LocationOptions.PHILADELPHIA ? 'contained' : 'text'}
          onPress={() => setNewLocation(LocationOptions.PHILADELPHIA)}
        >
          {LocationOptions.PHILADELPHIA}
        </Button>
        <Button
          color={colorTheme.midnightGreen}
          mode={newLocation === LocationOptions.NEW_YORK ? 'contained' : 'text'}
          onPress={() => setNewLocation(LocationOptions.NEW_YORK)}
        >
          {LocationOptions.NEW_YORK}
        </Button>
      </View>
      <Text>Price</Text>
      <View style={styles.horizontalButtonContainer}>
        <Button onPress={() => setNewDollarSigns(1)} color={newDollarSigns === 1 ? colorTheme.midnightGreen : 'black'}>$</Button>
        <Button onPress={() => setNewDollarSigns(2)} color={newDollarSigns === 2 ? colorTheme.midnightGreen : 'black'}>$$</Button>
        <Button onPress={() => setNewDollarSigns(3)} color={newDollarSigns === 3 ? colorTheme.midnightGreen : 'black'}>$$$</Button>
        <Button onPress={() => setNewDollarSigns(4)} color={newDollarSigns === 4 ? colorTheme.midnightGreen : 'black'}>$$$$</Button>
      </View>
      <Text>Course Type</Text>
      {populateButtons(mealTypeList, selectCourseTypeButton)}
      <Text>Cusine Type</Text>
      {populateButtons(cuisineTypeList, newRestaurantCuisineButton)}
      <Text>Has Alcohol?</Text>
      <View style={styles.horizontalButtonContainer}>
        <Button color={colorTheme.midnightGreen} onPress={() => setChangeHasAlc(true)} mode={changeHasAlc ? 'contained' : 'text'}>Yes</Button>
        <Button color={colorTheme.midnightGreen} onPress={() => setChangeHasAlc(false)} mode={changeHasAlc ? 'text' : 'contained'}>No</Button>
      </View>
      <TextInput mode="outlined" label="Recommended Dishes #1" value={firstRecommendedDish} onChangeText={v => setFirstRecommendedDish(v)} />
      <TextInput mode="outlined" label="Recommended Dishes #2" value={secondRecommendedDish} onChangeText={v => setSecondRecommendedDish(v)} />
      <TextInput mode="outlined" label="Recommended Dishes #3" value={thirdRecommendedDish} onChangeText={v => setThirdRecommendedDish(v)} />
      <View style={{ padding: 5 }}></View>
      <Button color={colorTheme.midnightGreen} mode="contained" onPress={() => submitChanges()}>Submit Changes</Button>
    </View>
  )
}

const editRestaurantStyles = StyleSheet.create({
  topButtonContainer: {
    flexDirection: 'row',
  },
  buttonFlex: {
    flex: 1
  },
  spacer: {
    flex: 1.5
  }
})
