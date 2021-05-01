import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { SafeArea } from '../../components/utility/safe.area.component';
import { Search } from './search-component';

export const FindRestaurants = (): JSX.Element => {
  return (
    <SafeArea>
      <Search />
    </SafeArea>
  )
}

const mapStyles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})