import React from "react";
import { Image, Platform, View, Text, StyleSheet } from "react-native";
import Webview from 'react-native-webview';

const isAndroid = Platform.OS === 'android';

export const CompactRestaurantInfo = ({ restaurant }: any): JSX.Element => {
  return (
    <View style={styles.imageContainer}>
      {isAndroid ?
        <Webview style={styles.imageView} source={{ uri: restaurant.photos[0] }} />
        :
        <Image source={{ uri: restaurant.photos[0] }} style={styles.imageView} />
      }
      <Text style={styles.restaurantText}>{restaurant.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    maxWidth: 120,
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,

  },
  imageView: {
    borderRadius: 10,
    width: 120,
    height: 80,
  },
  restaurantText: {
    textAlign: 'center',
    fontSize: 12,
  }
})
