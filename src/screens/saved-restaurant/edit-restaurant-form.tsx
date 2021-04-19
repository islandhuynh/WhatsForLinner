import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

import { styles } from '../../components/styles/stylesheet';

import { RestaurantDetail, emptyRestaurant } from '../../categories/restaurantDetails';

interface EditProps {
  selectedRestaurant: RestaurantDetail,
  restaurantList: RestaurantDetail[],
  setRestaurantList: React.Dispatch<React.SetStateAction<RestaurantDetail[]>>
  setInfoCardVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
}

export const EditRestaurant: React.FC<EditProps> = ({
  selectedRestaurant,
  restaurantList,
  setRestaurantList,
  setInfoCardVisibility,
  setEditMode,
}): JSX.Element => {
  let selectedRestaurantIndex = restaurantList.indexOf(selectedRestaurant);

  return (
    <View style={styles.modalView}>
      <Text>Edit Restaurant Info</Text>
      <Text>{selectedRestaurantIndex}</Text>
      <Text>{selectedRestaurant.name}</Text>
      <Text>{selectedRestaurant.courseType}</Text>
      <Text>{selectedRestaurant.dollarSigns}</Text>
      <Text>{selectedRestaurant.category}</Text>
      <Text>{selectedRestaurant.dishes}</Text>
      <Text>{selectedRestaurant.recommendedDishes}</Text>
      <Text>{selectedRestaurant.hasAlcohol}</Text>
      <Text>{selectedRestaurant.location}</Text>
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