import {z} from "zod"
import { CategoriesAPISchema, DrinkAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema, SearchFilterSchema } from "../schemas/recipes-schema"

export type Categories = z.infer<typeof CategoriesAPISchema>
export type SearchFilter = z.infer<typeof SearchFilterSchema>
export type Drinks = z.infer<typeof DrinksAPIResponseSchema>
export type Drink = z.infer<typeof DrinkAPIResponseSchema>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>

