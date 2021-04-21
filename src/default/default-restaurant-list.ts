import { LocationOptions } from "../categories/locationOptions";
import { CuisineType, MealType } from "../categories/mealOptions";
import { RestaurantDetail } from "../categories/restaurantDetails";

export const defaultRestaurantList: RestaurantDetail[] = [
  {
    name: 'Mixto',
    courseType: [MealType.MAIN, MealType.DRINKS],
    dollarSigns: 2,
    category: [CuisineType.LATIN_AMERICAN],
    dishes: [],
    recommendedDishes: ["Churrasco Argentino"],
    hasAlcohol: true,
    location: LocationOptions.PHILADELPHIA
  },
  {
    name: 'Butcher and Singer',
    courseType: [MealType.MAIN],
    dollarSigns: 4,
    category: [CuisineType.AMERICAN],
    dishes: [],
    recommendedDishes: ["Porter House Steak", "Mash Potato w/ Truffle Butter"],
    hasAlcohol: true,
    location: LocationOptions.PHILADELPHIA
  },
  {
    name: 'Spice C',
    courseType: [MealType.MAIN],
    dollarSigns: 2,
    category: [CuisineType.CHINESE],
    dishes: [],
    recommendedDishes: ["Seafood Handdrawn Noodles", "Garlic Wings"],
    hasAlcohol: false,
    location: LocationOptions.PHILADELPHIA
  },
  {
    name: 'SO Korean Grill',
    courseType: [MealType.MAIN],
    dollarSigns: 3,
    category: [CuisineType.KOREAN],
    dishes: [],
    recommendedDishes: ["LA Galbi Beef Ribs", "Galbi Jjim", "Beef Sirloin"],
    hasAlcohol: true,
    location: LocationOptions.PHILADELPHIA
  },
  {
    name: 'More Sugar',
    courseType: [MealType.MAIN, MealType.DESSERT],
    dollarSigns: 2,
    category: [CuisineType.AMERICAN],
    dishes: [],
    recommendedDishes: ["Sweet Potato Cake", "Soy Bean Box", "Cheesecake"],
    hasAlcohol: false,
    location: LocationOptions.PHILADELPHIA
  },
  {
    name: 'Snow Ice & Hot Dessert',
    courseType: [MealType.DESSERT],
    dollarSigns: 1,
    category: [CuisineType.KOREAN, CuisineType.JAPANESE],
    dishes: [],
    recommendedDishes: [],
    hasAlcohol: false,
    location: LocationOptions.PHILADELPHIA
  },
  {
    name: 'A La Mousse',
    courseType: [MealType.DESSERT],
    dollarSigns: 1,
    category: [CuisineType.CHINESE],
    dishes: [],
    recommendedDishes: [],
    hasAlcohol: false,
    location: LocationOptions.PHILADELPHIA
  },
  {
    name: 'Mr. Wish',
    courseType: [MealType.DRINKS],
    dollarSigns: 1,
    category: [CuisineType.CHINESE],
    dishes: [],
    recommendedDishes: ["Red bean pudding", "Lemon Sorbet", "Kumquat Green Tea"],
    hasAlcohol: false,
    location: LocationOptions.PHILADELPHIA
  },
  {
    name: 'Tiger Sugar',
    courseType: [MealType.DRINKS],
    dollarSigns: 1,
    category: [CuisineType.CHINESE],
    dishes: [],
    recommendedDishes: ["Number 2"],
    hasAlcohol: false,
    location: LocationOptions.PHILADELPHIA
  },
]