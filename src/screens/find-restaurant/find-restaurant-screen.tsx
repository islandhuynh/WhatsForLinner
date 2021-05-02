import React, { useContext, useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { SafeArea } from '../../components/utility/safe.area.component';
import { Search } from './search-component';
import { LocationContext } from '../../services/location/location-context';
import { RestaurantsContext } from '../../services/restaurant/restaurant-context';
import { CompactRestaurantInfo } from './compact-restaurant-info';
import { RestaurantInfo } from '../../categories/restaurantDetails';

export const FindRestaurants = (): JSX.Element => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);
  const [restaurantInfoVisibility, setRestaurantInfoVisibility] = useState(false);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <SafeArea>
      <Search />
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
              <Callout onPress={() => setRestaurantInfoVisibility(true)}>
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
  }
})