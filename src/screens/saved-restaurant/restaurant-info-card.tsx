import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { RestaurantDetail } from '../../categories/restaurantDetails';

interface InfoProps {
  selectedRestaurant: RestaurantDetail,
  setInfoCardVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
}

export const InfoCard: React.FC<InfoProps> = ({ selectedRestaurant, setInfoCardVisibility, setEditMode }): JSX.Element => {
  return (
    <View style={styles.modalView}>
      <Text>Restaurant Info</Text>
      <Text>{selectedRestaurant.name}</Text>
      <Text>{selectedRestaurant.courseType}</Text>
      <Text>{selectedRestaurant.dollarSigns}</Text>
      <Text>{selectedRestaurant.category}</Text>
      <Text>{selectedRestaurant.dishes}</Text>
      <Text>{selectedRestaurant.recommendedDishes}</Text>
      <Text>{selectedRestaurant.hasAlcohol}</Text>
      <Text>{selectedRestaurant.location}</Text>
      <Button onPress={() => setEditMode(true)}>edit</Button>
      <Button onPress={() => setInfoCardVisibility(false)}>search</Button>
      <Button onPress={() => setInfoCardVisibility(false)}>close</Button>
    </View>
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
  },
  errorText: {
    color: 'red'
  }
})