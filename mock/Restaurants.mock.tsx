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
  recommendedDishes?: string[],
  location: string
}

export const savedRestaurants: RestaurantDetail[] = [
  {
    name: "John's Roast Pork",
    courseType: ["Main"],
    dollarSigns: 1,
    category: ["American"],
    location: "Philadelphia",
    recommendedDishes: ["Cheese Steak"]
  },
  {
    name: "More Sugar",
    courseType: ["Main", "Dessert"],
    dollarSigns: 2,
    category: ["Dessert", "Brunch"],
    location: "Philadelphia",
    recommendedDishes: ["Sweet Potato Cake", "Cheese cake"]
  },
  {
    name: "Spice C",
    courseType: ["Main"],
    dollarSigns: 1,
    category: ["Chinese", "Warm"],
    location: "Philadelphia",
    recommendedDishes: ["Sweet Potato Cake", "Cheese cake"]
  },
  {
    name: "Bubble Fish",
    courseType: ["Main"],
    dollarSigns: 2,
    category: ["Sushi", "Drinks"],
    location: "Philadelphia",
    recommendedDishes: ["Poke Bowl"]
  },
  {
    name: "Tiger Sugar",
    courseType: ["Drinks"],
    dollarSigns: 1,
    category: ["Drinks", "Boba"],
    location: "Philadelphia",
    recommendedDishes: ["Number 2"]
  },
  {
    name: "SO Korean Grill",
    courseType: ["Main"],
    dollarSigns: 2,
    category: ["Korean", "Kbbq"],
    location: "Philadelphia",
    recommendedDishes: ["LA Galbi Beef Ribs", "Galbi Jjim", "Beef Sirloin"]
  },
  {
    name: "The Olde Bar",
    courseType: ["Main"],
    dollarSigns: 3,
    category: ["American", "Bar", "Alcoholic"],
    location: "Philadelphia",
    recommendedDishes: ["Oysters", "Crab Fingers"]
  },
  {
    name: "Sampan",
    courseType: ["Main", "Drinks"],
    dollarSigns: 2,
    category: ["American", "Bar", "Alcoholic"],
    location: "Philadelphia"
  },
  {
    name: "Shinka",
    courseType: ["Main"],
    dollarSigns: 2,
    category: ["Japanese", "Ramen"],
    location: "New York",
    recommendedDishes: ["Award Winning Bone Marrow Ramen"]
  },
  {
    name: "Mixto",
    courseType: ["Main", "Drinks"],
    dollarSigns: 2,
    category: ["Latin American", "Alcoholic"],
    location: "Philadelphia"
  },
  {
    name: "Butcher and Singer",
    courseType: ["Main"],
    dollarSigns: 4,
    category: ["American", "Steak"],
    location: "Philadelphia"
  },
]