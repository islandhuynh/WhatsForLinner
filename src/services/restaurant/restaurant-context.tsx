import React, { useState, useContext, createContext, useEffect } from "react";

import { RestaurantInfo } from '../../categories/restaurantDetails';
import { LocationContext } from "../location/location-context";

export const RestaurantsContext = createContext({} as any);

export const RestaurantsContextProvider = ({ children }: any) => {
  const [restaurants, setRestaurants] = useState<RestaurantInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveRestaurants = async (loc: string) => {
    setIsLoading(true);
    setRestaurants([]);

    await restaurantsRequest(loc)
      .then(restaurantsTransform)
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  const restaurantsRequest = async (location: string) => {
    try {
      const res = await fetch(
        `https://us-central1-mealstogo-f5ccd.cloudfunctions.net/placesNearby?location=${location}`
      );
      let data = await res.json();
      return data.results;
    } catch (error) {
      console.log("Restaurant Search Error:", error);
    }
  };

  const restaurantsTransform = (results: RestaurantInfo[]) => {
    console.log(results.length);
    const mappedResults = results.map(restaurant => {
      return {
        ...restaurant,
        address: restaurant.vicinity,
        isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
        isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
      };
    });

    setRestaurants(mappedResults);
  };

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};