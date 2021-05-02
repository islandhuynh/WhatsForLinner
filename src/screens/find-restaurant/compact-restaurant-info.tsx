import React from "react";
import { Image, Platform, View, Text, StyleSheet } from "react-native";
import Webview from 'react-native-webview';

const isAndroid = Platform.OS === 'android';

export const CompactRestaurantInfo = ({ restaurant }: any): JSX.Element => {
  return (
    <View style={styles.imageContainer}>
      {isAndroid ?
        <Webview style={styles.imageView} />
        :
        <Image source={{ uri: restaurant.photos[0] }} style={styles.imageView} />
      }
      <Text>{restaurant.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    maxWidth: 120,
    paddingBottom: 10,
    alignItems: 'center'
  },
  imageView: {
    borderRadius: 10,
    width: 120,
    height: 100,
  },
})
