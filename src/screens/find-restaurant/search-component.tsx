import React, { useContext, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { LocationContext } from '../../services/location/location-context';

export const Search = (): JSX.Element => {
  const { keyword, onSearch } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  return (
    <View>
      <Searchbar
        style={searchBarStyles.Bar}
        placeholder="Enter a location"
        icon="food"
        value={searchKeyword}
        onSubmitEditing={() => onSearch(searchKeyword)}
        onChangeText={(text) => setSearchKeyword(text)}
      />
    </View>
  )
}

const searchBarStyles = StyleSheet.create({
  Bar: {
    margin: 20,
  }
})