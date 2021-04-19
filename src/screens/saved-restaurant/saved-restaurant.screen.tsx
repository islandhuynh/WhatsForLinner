import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Modal } from 'react-native';
import { List, Button } from 'react-native-paper';

import { SafeArea } from '../../components/utility/safe.area.component';
import { AddNewRestaurantForm } from './add-new-restaurant.form';
import { MealType } from '../../categories/mealOptions';

import { savedRestaurants } from '../../../mock/Restaurants.mock';

export const SavedRestaurants = (): JSX.Element => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [restaurantList, setRestaurantList] = useState(savedRestaurants);

  return (
    <SafeArea>
      <ScrollView>
        <Modal visible={modalVisibility} transparent={true} >
          <AddNewRestaurantForm restaurantList={restaurantList} setModalVisibility={setModalVisibility} setRestaurantList={setRestaurantList} />
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
  },
  errorText: {
    color: 'red'
  }
})