import { useGlobalContext } from "../context";

const Modal = () => {
  const { selectedMeal, closeModal } = useGlobalContext();

  return (
    <aside className="modal-container">
      <div className="modal-card">
        <img
          className="img img-modal"
          src={selectedMeal.strMealThumb}
          alt={selectedMeal.strMeal}
        />
        <div className="modal-content">
          <h3>{selectedMeal.strMeal}</h3>
          <p>Cooking instructions</p>
          <p>{selectedMeal.strInstructions}</p>
          <a href={selectedMeal.strSource} target="_blank">
            Original source
          </a>
          <button className="btn btn-hipster btn-close" onClick={closeModal}>
            close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
