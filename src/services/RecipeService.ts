import axios from "axios"
import { CategoriesAPISchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from "../schemas/recipes-schema"
import { Drink, SearchFilter } from "../types"


export async function getCategories() {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    const {data} = await axios(url)
    //Verifica la respuesta de la api con el schema definido
    const result = CategoriesAPISchema.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export async function getRecipes(searchFilters : SearchFilter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilters.category}&i=${searchFilters.ingredient}`
    const {data} = await axios(url)
    const result = DrinksAPIResponseSchema.safeParse(data)
    if (result.success) {
        return result.data
    }
}

export async function getRecipeDetailsById(id: Drink["idDrink"]) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if (result.success) {
        return result.data
    }
}