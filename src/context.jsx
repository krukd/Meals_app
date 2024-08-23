import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";


const getFavoritesFromLocalStorage = () => {
  const items = localStorage.getItem("favorites");
  let favorites;
  
  if (items) {
    favorites = JSON.parse(items);
  } else {
    favorites = [];
  }

  return favorites;
};

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favoriteMeals, setFavorite] = useState(getFavoritesFromLocalStorage());

  

  const addFavoriteMeal = (id) => {
    const favMeal = meals.find((meal) => meal.idMeal === id);
    const isAlreadyFav = favoriteMeals.find((meal) => meal.idMeal === id);
    if (isAlreadyFav) return;

    const updatedFavorites = [...favoriteMeals, favMeal];

    setFavorite(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavMeal = (id) => {
    const mealToRemove = favoriteMeals.find((meal) => meal.idMeal === id);

    if (!mealToRemove) return;

    const updatedFavorites = favoriteMeals.filter((meal) => meal.idMeal !== id);

    setFavorite(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  };

  // Use useEffect to log when the favoriteMeals array changes
  useEffect(() => {
    console.log(favoriteMeals);
  }, [favoriteMeals]);

  const selectMeal = (id, favoriteMeal) => {
    let meal;

    if (favoriteMeal) {
      meal = favoriteMeals.find((meal) => meal.idMeal === id);
    } else {
      meal = meals.find((meal) => meal.idMeal === id);
    }

    setSelectedMeal(meal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);

      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!search) return;
    fetchMeals(`${allMealsUrl}${search}`);
  }, [search]);
  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearch,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        favoriteMeals,
        addFavoriteMeal,
        removeFavMeal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//кастомный хук контекст
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
