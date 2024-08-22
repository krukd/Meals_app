import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('')
  

  const fetchMeals = async (url) => {

    setLoading(true);
    try {
      const { data } = await axios(url);
      
      if(data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([])
      }
    } catch (error) {
      console.log(error.response);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMeals(`${allMealsUrl}${search}`)
  }, [search]);
  return (
    <AppContext.Provider value={{ loading, meals, setSearch }}>
      {children}
    </AppContext.Provider>
  );
};

//кастомный хук контекст
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
