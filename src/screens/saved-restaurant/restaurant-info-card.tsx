import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import { RestaurantDetail } from '../../categories/restaurantDetails';

interface InfoProps {
  selectedRestaurant: RestaurantDetail,
  setInfoCardVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
}

export const InfoCard: React.FC<InfoProps> = ({ selectedRestaurant, setInfoCardVisibility, setEditMode }): JSX.Element => {
  return (
    <View style={styles.modalView}>
      <View style={cardStyles.iconButtonContainer}>
        <IconButton icon="close-thick" onPress={() => setInfoCardVisibility(false)} style={cardStyles.closeButton} />
        <IconButton icon="file-document-edit" onPress={() => setEditMode(true)} style={cardStyles.editButton} />
      </View>
      <Text style={cardStyles.title}>{selectedRestaurant.name}</Text>
      <Text>Course Type</Text>
      <Text>{selectedRestaurant.courseType}</Text>
      <Text>{'$'.repeat(selectedRestaurant.dollarSigns)}</Text>
      <Text>{selectedRestaurant.category}</Text>
      <Text>{selectedRestaurant.dishes}</Text>
      <Text>Recommended Dishes</Text>
      <Text>{selectedRestaurant.recommendedDishes}</Text>
      <Text>{selectedRestaurant.hasAlcohol ? 'Has Alcohol' : 'Does not have alcohol'}</Text>
      <Text>Location: {selectedRestaurant.location}</Text>
      <Button mode="contained" onPress={() => Linking.openURL(`https://www.google.com/search?q=${selectedRestaurant.name}`)}>search</Button>
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
    paddingBottom: 20,
    paddingLeft: 35,
    paddingRight: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    color: 'red'
  }
})

const cardStyles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  iconButtonContainer: {
    flexDirection: 'row',
    paddingBottom: 45
  },
  editButton: {
    marginTop: 10,
    marginLeft: 280,
    position: 'absolute'
  },
  closeButton: {
    marginTop: 10,
    marginLeft: -20,
    position: 'absolute'
  }
})