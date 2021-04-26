import React, { useState, useContext } from 'react';
import { ScrollView, View, Modal } from 'react-native';
import { List, Button } from 'react-native-paper';

import { SafeArea } from '../../components/utility/safe.area.component';
import { AddNewRestaurantForm } from './add-new-restaurant.form';
import { InfoCard } from './restaurant-info-card';
import { MealType } from '../../categories/mealOptions';
import { styles } from '../../components/styles/stylesheet';

import { NewFolderForm } from './new-folder-form';
import { EditRestaurant } from './edit-restaurant-form';
import { RestaurantDetail, emptyRestaurant } from '../../categories/restaurantDetails';
import { AuthContext } from '../../services/authentification/firebase-auth';

enum FormTypes {
  NEW_RESTAURANT,
  NEW_FOLDER
}

export const SavedRestaurants = (): JSX.Element => {
  const { savedRestaurants } = useContext(AuthContext);

  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [infoCardVisibility, setInfoCardVisibility] = useState<boolean>(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantDetail>(emptyRestaurant);
  const [form, setForm] = useState<FormTypes>(FormTypes.NEW_FOLDER);
  const [editMode, setEditMode] = useState<boolean>(false);

  const createRestaurantList = (restaurantList: RestaurantDetail[], courseType: MealType): JSX.Element => {
    return (
      <>
        {restaurantList.map(restaurant => restaurant.courseType.includes(courseType) ?
          <List.Item
            key={restaurant.name + courseType}
            title={restaurant.name}
            onPress={() => {
              setInfoCardVisibility(true)
              setSelectedRestaurant(restaurant)
            }}
          />
          :
          null
        )}
      </>
    )
  }

  return (
    <SafeArea>
      <ScrollView>
        <Modal visible={modalVisibility} transparent={true} >
          {form === FormTypes.NEW_FOLDER ?
            <NewFolderForm setModalVisibility={setModalVisibility} />
            :
            <AddNewRestaurantForm setModalVisibility={setModalVisibility} />
          }
        </Modal>
        <Modal visible={infoCardVisibility} transparent={true}>
          {editMode ?
            <EditRestaurant
              selectedRestaurant={selectedRestaurant}
              setInfoCardVisibility={setInfoCardVisibility}
              setEditMode={setEditMode}
            />
            :
            <InfoCard selectedRestaurant={selectedRestaurant} setInfoCardVisibility={setInfoCardVisibility} setEditMode={setEditMode} />
          }
        </Modal>
        <List.Section>
          <List.Accordion title="Main Courses" left={props => <List.Icon {...props} icon="food" />}>
            {createRestaurantList(savedRestaurants, MealType.MAIN)}
          </List.Accordion>
          <List.Accordion title="Desserts" left={props => <List.Icon {...props} icon="cake" />}>
            {createRestaurantList(savedRestaurants, MealType.DESSERT)}
          </List.Accordion>
          <List.Accordion title="Drinks" left={props => <List.Icon {...props} icon="glass-cocktail" />}>
            {createRestaurantList(savedRestaurants, MealType.DRINKS)}
          </List.Accordion>
        </List.Section>
        <View style={styles.horizontalButtonContainer}>
          <Button
            onPress={() => {
              setModalVisibility(true)
              setForm(FormTypes.NEW_RESTAURANT)
            }}
          >Add new Restaurant</Button>
          {/* <Button
            onPress={() => {
              setModalVisibility(true)
              setForm(FormTypes.NEW_FOLDER)
            }}
          >Add new folder</Button> */}
        </View>
      </ScrollView>
    </SafeArea>
  )
}