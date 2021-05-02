export interface RestaurantDetail {
  name: string,
  courseType: string[],
  dollarSigns: number,
  category: string[],
  dishes: string[]
  recommendedDishes: string[],
  hasAlcohol: boolean,
  location: string
}

export const emptyRestaurant: RestaurantDetail = {
  name: '',
  courseType: [],
  dollarSigns: 0,
  category: [],
  dishes: [],
  recommendedDishes: [],
  hasAlcohol: false,
  location: ''
}

// Below is for restaurants found using places API - To be renamed later
export interface RestaurantInfo {
  "business_status": string,
  "geometry": {
    "location": {
      "lat": number,
      "lng": number
    },
    "viewport": {
      "northeast": {
        "lat": number,
        "lng": number
      },
      "southwest": {
        "lat": number,
        "lng": number
      }
    }
  },
  "icon": string,
  "name": string,
  "opening_hours": {
    "open_now": true
  },
  "photos": string[],
  "place_id": string,
  "plus_code": {
    "compound_code": string,
    "global_code": string
  },
  "price_level": number,
  "rating": number,
  "reference": string,
  "scope": string,
  "types": string[],
  "user_ratings_total": number,
  "vicinity": string
}