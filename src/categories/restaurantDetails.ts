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