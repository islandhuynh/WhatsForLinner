export interface RestaurantDetail {
  name: string,
  courseType: string[],
  dollarSigns: number,
  category: string[],
  recommendedDishes?: string[],
  location: string
}