import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, Button } from 'react-native-paper';

import { SafeArea } from '../../components/utility/safe.area.component';

import { MealType } from '../../categories/mealOptions';

import { savedRestaurants } from '../../../mock/Restaurants.mock';

export const SavedRestaurants = (): JSX.Element => {
  return (
    <SafeArea>
      <ScrollView>
        <List.Section>
          <List.Accordion title="Main Courses" left={props => <List.Icon {...props} icon="food" />}>
            {savedRestaurants.map(restaurant => restaurant.courseType.includes(MealType.MAIN) ?
              <List.Item key={restaurant.name + '-Main'} title={restaurant.name} right={props => <List.Icon {...props} icon="playlist-edit" />} />
              :
              null
            )}
          </List.Accordion>
          <List.Accordion title="Desserts" left={props => <List.Icon {...props} icon="cake" />}>
            {savedRestaurants.map(restaurant => restaurant.courseType.includes(MealType.DESSERT) ?
              <List.Item key={restaurant.name + '-Dessert'} title={restaurant.name} right={props => <List.Icon {...props} icon="playlist-edit" />} />
              :
              null
            )}
          </List.Accordion>
          <List.Accordion title="Drinks" left={props => <List.Icon {...props} icon="glass-cocktail" />}>
            {savedRestaurants.map(restaurant => restaurant.courseType.includes(MealType.DRINKS) ?
              <List.Item key={restaurant.name + '-Drinks'} title={restaurant.name} right={props => <List.Icon {...props} icon="playlist-edit" />} />
              :
              null
            )}
          </List.Accordion>
        </List.Section>
        <View style={styles.horizontalButtonContainer}>
          <Button onPress={() => console.log('test')}>Add new Restaurant</Button>
          <Button onPress={() => console.log('test')}>Add new Folder</Button>
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
  }
})