enum CourseType {
  Main = "Main",
  Dessert = "Dessert",
  Drinks = "Drinks"
}

interface RestaurantDetail {
  name: string,
  courseType: string[],
  dollarSigns: number,
  category: string[]
}

export const savedRestaurants: RestaurantDetail[] = [
  {
    name: "John's Roast Pork",
    courseType: ["Main"],
    dollarSigns: 1,
    category: ["American"],
  },
  {
    name: "More Sugar",
    courseType: ["Main", "Dessert"],
    dollarSigns: 2,
    category: ["Dessert", "Brunch"],
  },
  {
    name: "Spice C",
    courseType: ["Main"],
    dollarSigns: 1,
    category: ["Chinese", "Warm"],
  },
  {
    name: "Bubble Fish",
    courseType: ["Main"],
    dollarSigns: 2,
    category: ["Sushi", "Drinks"],
  },
  {
    name: "Tiger Sugar",
    courseType: ["Drinks"],
    dollarSigns: 1,
    category: ["Drinks", "Boba"],
  },
]