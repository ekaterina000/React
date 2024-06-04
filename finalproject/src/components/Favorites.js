import React from 'react';
import PokemonCard from './PokemonCard';
import '../styles/Favorites.css';

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites">
      <div className="pokemon-list">
        {favorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            addToFavorites={removeFromFavorites}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;


