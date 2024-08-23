import { useGlobalContext } from "../context";

const Favorites = () => {
  const { favoriteMeals, removeFavMeal, selectMeal } = useGlobalContext();
  return (
    <section className="favorites-container">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-meals">
          {favoriteMeals.map((meal) => {
            return (
              <div key={meal.idMeal} className="favorite-meal">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="favorites-img img"
                  onClick={() => selectMeal(meal.idMeal, true)}
                />
                <button
                  className="delete-btn"
                  onClick={() => removeFavMeal(meal.idMeal)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
