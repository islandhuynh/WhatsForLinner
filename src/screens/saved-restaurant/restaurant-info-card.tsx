import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import { RestaurantDetail } from '../../categories/restaurantDetails';
import { colorTheme } from '../../components/styles/theme';

interface InfoProps {
  selectedRestaurant: RestaurantDetail,
  setInfoCardVisibility: React.Dispatch<React.SetStateAction<boolean>>,
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
}

export const InfoCard: React.FC<InfoProps> = ({ selectedRestaurant, setInfoCardVisibility, setEditMode }): JSX.Element => {
  const createRecommendedList = (recommendedDishesArray: string[]) => {
    let recommendedList = [];
    for (let i = 0; i < recommendedDishesArray.length; i++) recommendedList.push(<Text>{i + 1}. {recommendedDishesArray[i]}</Text>);
    return recommendedList;
  }

  const createCategoryList = (categories: string[]) => {
    if (categories.length === 1) return <Text>{categories[0]}</Text>
    let listString = '';
    for (let i = 0; i < categories.length - 1; i++) {
      listString += categories[i] + ', ';
    }
    return <Text>{listString += categories[categories.length - 1]}</Text>
  }

  return (
    <View style={styles.modalView}>
      <View style={cardStyles.iconButtonContainer}>
        <IconButton icon="close-thick" onPress={() => setInfoCardVisibility(false)} style={cardStyles.closeButton} />
        <IconButton icon="file-document-edit" onPress={() => setEditMode(true)} style={cardStyles.editButton} />
      </View>
      <Text style={cardStyles.title}>{selectedRestaurant.name}</Text>
      <View style={styles.spacer} />
      <Text>Course Type: {createCategoryList(selectedRestaurant.courseType)}</Text>
      <Text>Price: {'$'.repeat(selectedRestaurant.dollarSigns)}</Text>
      <Text>Cuisine Type: {createCategoryList(selectedRestaurant.category)}</Text>
      <Text>Recommended Dishes</Text>
      {selectedRestaurant.recommendedDishes ? createRecommendedList(selectedRestaurant.recommendedDishes) : null}
      <Text>Has Alcohol: {selectedRestaurant.hasAlcohol ? 'Yes' : 'No'}</Text>
      <Text>Location: {selectedRestaurant.location}</Text>
      <View style={styles.spacer} />
      <Button
        color={colorTheme.midnightGreen}
        mode="contained"
        onPress={() => Linking.openURL(`https://www.google.com/search?q=${selectedRestaurant.name}`)}
      >
        search
      </Button>
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
  },
  spacer: {
    padding: 5
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
    marginLeft: 245,
    position: 'absolute'
  },
  closeButton: {
    marginTop: 10,
    marginLeft: -20,
    position: 'absolute'
  }
})