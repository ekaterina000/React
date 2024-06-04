import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import Favorites from './components/Favorites';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const addToFavorites = (pokemon) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === pokemon.id)) {
        return [...prevFavorites, pokemon];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (pokemon) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== pokemon.id)
    );
  };

  return (
    <Router>
      <div className="app-container">
        <NavBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
        <Routes>
          <Route
            path="/"
            element={<Home addToFavorites={addToFavorites} search={search} filter={filter} />}
          />
          <Route path="/pokemon/:id" element={<Pokemon />} />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



