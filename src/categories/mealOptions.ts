export enum MealType {
  MAIN = 'Main',
  DESSERT = 'Dessert',
  DRINKS = 'Drinks'
}

export enum CuisineType {
  AMERICAN = "American",
  CHINESE = "Chinese",
  INDIAN = "Indian",
  ITALIAN = "Italian",
  JAPANESE = "Japanese",
  KOREAN = "Korean",
  LATIN_AMERICAN = "Latin American",
  MEXICAN = "Mexican",
  NO_PREF = "NO PREF"
}

export const mealTypeList: MealType[] = [
  MealType.MAIN,
  MealType.DESSERT,
  MealType.DRINKS
];

export const cuisineTypeList: CuisineType[] = [
  CuisineType.AMERICAN,
  CuisineType.CHINESE,
  CuisineType.INDIAN,
  CuisineType.ITALIAN,
  CuisineType.JAPANESE,
  CuisineType.KOREAN,
  CuisineType.LATIN_AMERICAN,
  CuisineType.MEXICAN,
  CuisineType.NO_PREF
];