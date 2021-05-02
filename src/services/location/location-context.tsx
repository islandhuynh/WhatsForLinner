import React, { useState, useEffect } from "react";

export const LocationContext = React.createContext({} as any);

export const LocationContextProvider = ({ children }: any) => {
  const [keyword, setKeyword] = useState("Philadelphia");
  const [location, setLocation] = useState<null | {}>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  const locationRequest = async (searchTerm: string) => {
    try {
      const res = await fetch(
        `https://us-central1-mealstogo-f5ccd.cloudfunctions.net/geocode?address=${searchTerm}`
      );
      let data = await res.json();
      setLocation({
        lat: data.results[0].geometry.location.lat,
        lng: data.results[0].geometry.location.lng,
        viewport: data.results[0].geometry.viewport
      })
      setIsLoading(false);
    } catch (err) {
      setError(err);
      console.log("Location Request Error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    locationRequest(keyword.toLowerCase())
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};