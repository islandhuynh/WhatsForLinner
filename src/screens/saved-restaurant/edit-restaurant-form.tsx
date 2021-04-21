import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { styles } from '../../components/styles/stylesheet';
import { ErrorTypes } from '../../categories/errors';
import { RestaurantDetail, emptyRestaurant } from '../../categories/restaurantDetails';
import { LocationOptions } from '../../categories/locationOptions';
import { populateButtons } from '../../functions/populateButtons';
import { mealTypeList, cuisineTypeList, CuisineType } from '../../categories/mealOptions';
import { AuthContext } from '../../services/authentification/firebase-auth';

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
  const { savedRestaurants, setSavedRestaurants } = useContext(AuthContext);

  let selectedRestaurantIndex = savedRestaurants.indexOf(selectedRestaurant);

  const [newName, setNewName] = useState(selectedRestaurant.name);
  const [newCourseTypes, setNewCourseTypes] = useState(selectedRestaurant.courseType);
  const [newDollarSigns, setNewDollarSigns] = useState(selectedRestaurant.dollarSigns);
  const [newCategories, setNewCategories] = useState(selectedRestaurant.category);
  const [newDishes, setNewDishes] = useState(selectedRestaurant.dishes);
  const [newRecommendedDishes, setNewRecommendedDishes] = useState(selectedRestaurant.recommendedDishes);
  const [changeHasAlc, setChangeHasAlc] = useState(selectedRestaurant.hasAlcohol);
  const [newLocation, setNewLocation] = useState(selectedRestaurant.location);

  const [editFormError, setEditFormError] = useState<ErrorTypes | undefined>(undefined);

  const newRestaurantCuisineButton = (cuisine: string): JSX.Element => {
    if (cuisine === CuisineType.NO_PREF) {
      return <Button
        mode={newCategories.length > 0 ? 'text' : 'contained'}
        onPress={() => setNewCategories([])}
      >
        Other
          </Button>
    } else {
      return (
        <>
          {newCategories.includes(cuisine) ?
            <Button mode='contained' onPress={() => setNewCategories(newCategories.filter((n) => { return n !== cuisine }))}>{cuisine}</Button>
            :
            <Button mode='text' onPress={() => setNewCategories([...newCategories, cuisine])}>{cuisine}</Button>
          }
        </>
      )
    }
  }

  const selectCourseTypeButton = (courseType: string): JSX.Element => {
    return (
      <>
        {newCourseTypes.includes(courseType) ?
          <Button mode='contained' onPress={() => setNewCourseTypes(newCourseTypes.filter((n) => { return n !== courseType }))}>{courseType}</Button>
          :
          <Button mode='text' onPress={() => setNewCourseTypes([...newCourseTypes, courseType])}>{courseType}</Button>
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
      recommendedDishes: newRecommendedDishes,
      hasAlcohol: changeHasAlc,
      location: newLocation
    }

    let tempRestaurantList = savedRestaurants;

    tempRestaurantList[selectedRestaurantIndex] = editedRestaurant;

    setSavedRestaurants(tempRestaurantList);

    setInfoCardVisibility(false);
  }

  return (
    <View style={styles.modalView}>
      <Text>Edit Restaurant Info</Text>
      <Text>{selectedRestaurantIndex}</Text>
      <TextInput mode="outlined" label="Restaurant name" value={newName} onChangeText={name => setNewName(name)} />
      <Text>Location</Text>
      <View style={styles.horizontalButtonContainer}>
        <Button
          mode={newLocation === LocationOptions.PHILADELPHIA ? 'contained' : 'text'}
          onPress={() => setNewLocation(LocationOptions.PHILADELPHIA)}
        >
          {LocationOptions.PHILADELPHIA}
        </Button>
        <Button
          mode={newLocation === LocationOptions.NEW_YORK ? 'contained' : 'text'}
          onPress={() => setNewLocation(LocationOptions.NEW_YORK)}
        >
          {LocationOptions.NEW_YORK}
        </Button>
      </View>
      <Text>Price</Text>
      <View style={styles.horizontalButtonContainer}>
        <Button onPress={() => setNewDollarSigns(1)} color={newDollarSigns === 1 ? 'blue' : 'black'}>$</Button>
        <Button onPress={() => setNewDollarSigns(2)} color={newDollarSigns === 2 ? 'blue' : 'black'}>$$</Button>
        <Button onPress={() => setNewDollarSigns(3)} color={newDollarSigns === 3 ? 'blue' : 'black'}>$$$</Button>
        <Button onPress={() => setNewDollarSigns(4)} color={newDollarSigns === 4 ? 'blue' : 'black'}>$$$$</Button>
      </View>
      <View style={styles.horizontalButtonContainer}>
        {populateButtons(mealTypeList, selectCourseTypeButton)}
      </View>
      <Text>Cusine Type</Text>
      {populateButtons(cuisineTypeList, newRestaurantCuisineButton)}
      <Text>Has Alcohol?</Text>
      <View style={styles.horizontalButtonContainer}>
        <Button onPress={() => setChangeHasAlc(true)} mode={changeHasAlc ? 'contained' : 'text'}>Yes</Button>
        <Button onPress={() => setChangeHasAlc(false)} mode={changeHasAlc ? 'text' : 'contained'}>No</Button>
      </View>
      <Button onPress={() => submitChanges()}>Submit Changes</Button>
      <Button onPress={() => setEditMode(false)}>return</Button>
      <Button
        onPress={() => {
          setInfoCardVisibility(false)
          setEditMode(false)
        }}
      >
        close
      </Button>
    </View>
  )
}


