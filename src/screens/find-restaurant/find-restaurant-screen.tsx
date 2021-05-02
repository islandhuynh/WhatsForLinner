import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, Image, Linking } from 'react-native';
import { SafeArea } from '../../components/utility/safe.area.component';
import { Search } from './search-component';
import { LocationContext } from '../../services/location/location-context';
import { RestaurantsContext } from '../../services/restaurant/restaurant-context';
import { CompactRestaurantInfo } from './compact-restaurant-info';
import { RestaurantInfo } from '../../categories/restaurantDetails';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';

export const FindRestaurants = (): JSX.Element => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);
  const [restaurantInfoVisibility, setRestaurantInfoVisibility] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantInfo | null>(null);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <SafeArea>
      <Search />
      <Modal isVisible={restaurantInfoVisibility}>
        <View style={mapStyles.restaurantInfoContainer}>
          {selectedRestaurant ?
            <>
              <Text style={mapStyles.restaurantName}>{selectedRestaurant.name}</Text>
              <Image source={{ uri: selectedRestaurant.photos[0] }} style={mapStyles.restaurantInfo} />
              <Text>Average Rating: {selectedRestaurant.rating}</Text>
              <Text>Price: {selectedRestaurant.price_level}</Text>
              <Button onPress={() => Linking.openURL(`https://www.google.com/search?q=${selectedRestaurant.name}`)}>More Info</Button>
              <Button onPress={() => setRestaurantInfoVisibility(false)}>Close</Button>
            </>
            :
            null
          }
        </View>
      </Modal>
      <MapView
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
        style={mapStyles.map}
      >
        {restaurants.map((restaurant: RestaurantInfo, index: number) => {
          return (
            <Marker
              key={restaurant.name + index}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng
              }}
            >
              <Callout onPress={() => {
                setRestaurantInfoVisibility(true)
                setSelectedRestaurant(restaurant)
              }}>
                <CompactRestaurantInfo restaurant={restaurant} />
              </Callout>
            </Marker>
          )
        })}
      </MapView>
    </SafeArea>
  )
}

const mapStyles = StyleSheet.create({
  map: {
    alignSelf: 'center',
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 110,
  },
  restaurantInfo: {
    borderRadius: 10,
    width: 250,
    height: 150,
  },
  restaurantInfoContainer: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
    alignItems: 'center'
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 16
  }
})