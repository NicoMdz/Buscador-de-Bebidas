import { StateCreator } from "zustand"
import { getCategories, getRecipeDetailsById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import { FavoritesSliceType } from "./favoritesSlice"

export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters : SearchFilter) => Promise<void>
    selectRecipe: (id: Drink["idDrink"]) => Promise<void>
    closeModal: () => void
}
//Nested Slices
export const createRecipesSlice : StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        //Asignamos el resultado de la función a una variable para ahora tener los datos desde el store
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (searchFilters) => {
        const drinks = await getRecipes(searchFilters)
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeDetailsById(id)
        set({
            selectedRecipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})