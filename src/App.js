import React from "react";
import "./App.css";
import Favorites from "./components/Favorites";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import Search from "./components/Search";
import { useGlobalContext } from "./context";

function App() {
  const {showModal} = useGlobalContext()
  
  return (
    <div className="App">
      <Search />
      {/* <Favorites /> */}
      <Meals />
      {showModal && < Modal />}
    </div>
  );
}

export default App;
