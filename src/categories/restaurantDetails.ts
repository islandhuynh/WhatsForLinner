export interface RestaurantDetail {
  name: string,
  courseType: string[],
  dollarSigns: number,
  category: string[],
  dishes: string[]
  recommendedDishes?: string[],
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