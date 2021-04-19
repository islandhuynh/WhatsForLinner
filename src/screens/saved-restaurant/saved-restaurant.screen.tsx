import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Modal, Text } from 'react-native';
import { List, Button } from 'react-native-paper';

import { SafeArea } from '../../components/utility/safe.area.component';
import { AddNewRestaurantForm } from './add-new-restaurant.form';
import { MealType } from '../../categories/mealOptions';

import { savedRestaurants } from '../../../mock/Restaurants.mock';
import { NewFolderForm } from './new-folder-form';
import { RestaurantDetail, emptyRestaurant } from '../../categories/restaurantDetails';

enum FormTypes {
  NEW_RESTAURANT,
  NEW_FOLDER
}

export const SavedRestaurants = (): JSX.Element => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [infoCardVisibility, setInfoCardVisibility] = useState<boolean>(false);
  const [restaurantList, setRestaurantList] = useState(savedRestaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetail>(emptyRestaurant);
  const [form, setForm] = useState<FormTypes>(FormTypes.NEW_FOLDER);
  const [editMode, setEditMode] = useState<boolean>(false);

  const InfoCard = (): JSX.Element => {
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

  const EditRestaurant = (): JSX.Element => {
    return (
      <View style={styles.modalView}>
        <Text>Edit Restaurant Info</Text>
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

  return (
    <SafeArea>
      <ScrollView>
        <Modal visible={modalVisibility} transparent={true} >
          {form === FormTypes.NEW_FOLDER ?
            <NewFolderForm setModalVisibility={setModalVisibility} />
            :
            <AddNewRestaurantForm restaurantList={restaurantList} setModalVisibility={setModalVisibility} setRestaurantList={setRestaurantList} />
          }
        </Modal>
        <Modal visible={infoCardVisibility} transparent={true}>
          {editMode ?
            <EditRestaurant />
            :
            <InfoCard />
          }
        </Modal>
        <List.Section>
          <List.Accordion title="Main Courses" left={props => <List.Icon {...props} icon="food" />}>
            {restaurantList.map(restaurant => restaurant.courseType.includes(MealType.MAIN) ?
              <List.Item
                key={restaurant.name + '-Main'}
                title={restaurant.name} right={props => <List.Icon {...props} icon="playlist-edit" />}
                onPress={() => {
                  setInfoCardVisibility(true)
                  setSelectedRestaurant(restaurant)
                }}
              />
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
          <Button
            onPress={() => {
              setModalVisibility(true)
              setForm(FormTypes.NEW_RESTAURANT)
            }}
          >Add new Restaurant</Button>
          <Button
            onPress={() => {
              setModalVisibility(true)
              setForm(FormTypes.NEW_FOLDER)
            }}
          >Add new folder</Button>
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
  },
  errorText: {
    color: 'red'
  }
})