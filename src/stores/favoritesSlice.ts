import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { RecipesSliceType, createRecipesSlice } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType  } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

//Nested Slices
export const createFavoritesSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    //Si ya está en state, lo elimina
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Receta eliminada de favoritos",
        error: false,
      });
    } else {
      //Si no está en state, lo agrega
      //Sintaxis de recuperar el state
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Receta agregada a Favoritos",
        error: false,
      });

      //Sintaxis de get
      // set({
      //     favorites: [...get().favorites, recipe]
      // })
    }
    createRecipesSlice(set, get, api).closeModal();
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
