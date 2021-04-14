enum CourseType {
  Main = "Main",
  Dessert = "Dessert",
  Drinks = "Drinks"
}

interface RestaurantDetail {
  name: string,
  courseType: string[],
  dollarSigns: number,
  category: string[],
  dishes: string[]
  recommendedDishes?: string[],
  hasAlcohol: boolean,
  location: string
}

export const savedRestaurants: RestaurantDetail[] = [
  {
    name: "John's Roast Pork",
    courseType: ["Main"],
    dollarSigns: 1,
    category: ["American"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    recommendedDishes: ["Cheesesteak"],
    hasAlcohol: false
  },
  {
    name: "More Sugar",
    courseType: ["Main", "Dessert"],
    dollarSigns: 2,
    category: ["Dessert", "Brunch"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    recommendedDishes: ["Sweet Potato Cake", "Cheese cake"],
    hasAlcohol: false
  },
  {
    name: "Spice C",
    courseType: ["Main"],
    dollarSigns: 1,
    category: ["Chinese", "Warm"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    recommendedDishes: ["Sweet Potato Cake", "Cheese cake"],
    hasAlcohol: false
  },
  {
    name: "Bubble Fish",
    courseType: ["Main"],
    dollarSigns: 2,
    category: ["Sushi", "Drinks"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    recommendedDishes: ["Poke Bowl"],
    hasAlcohol: true
  },
  {
    name: "Tiger Sugar",
    courseType: ["Drinks"],
    dollarSigns: 1,
    category: ["Drinks", "Boba"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    recommendedDishes: ["Number 2"],
    hasAlcohol: false
  },
  {
    name: "SO Korean Grill",
    courseType: ["Main"],
    dollarSigns: 2,
    category: ["Korean", "KBBQ"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    recommendedDishes: ["LA Galbi Beef Ribs", "Galbi Jjim", "Beef Sirloin"],
    hasAlcohol: true
  },
  {
    name: "The Olde Bar",
    courseType: ["Main"],
    dollarSigns: 3,
    category: ["American", "Bar", "Alcoholic"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    recommendedDishes: ["Oysters", "Crab Fingers"],
    hasAlcohol: true
  },
  {
    name: "Sampan",
    courseType: ["Main", "Drinks"],
    dollarSigns: 2,
    category: ["American", "Bar", "Alcoholic"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    hasAlcohol: true
  },
  {
    name: "Shinka",
    courseType: ["Main"],
    dollarSigns: 2,
    category: ["Japanese", "Ramen"],
    dishes: ["Cheesesteak"],
    location: "New York",
    recommendedDishes: ["Award Winning Bone Marrow Ramen"],
    hasAlcohol: false
  },
  {
    name: "Mixto",
    courseType: ["Main", "Drinks"],
    dollarSigns: 2,
    category: ["Latin American", "Alcoholic"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    hasAlcohol: true
  },
  {
    name: "Butcher and Singer",
    courseType: ["Main"],
    dollarSigns: 4,
    category: ["American", "Steak"],
    dishes: ["Cheesesteak"],
    location: "Philadelphia",
    hasAlcohol: true
  },
]