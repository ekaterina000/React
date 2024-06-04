import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/PokemonCard.css'

const PokemonCard = ({ pokemon, addToFavorites, currentPage }) => {
  const pokemonId = pokemon.url.split('/')[6];

  const handleAddToFavorites = () => {
    addToFavorites(pokemon);
  };

  return (
    <Card className="pokemon-card">
      <div className="pokemon-image-container">
        <Card.Img
          variant="top"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          className="pokemon-image"
        />
      </div>
      <Card.Body>
        <Card.Title className="pokemon-name">{pokemon.name}</Card.Title>
        <Button
          as={Link}
          to={{
            pathname: `/pokemon/${pokemonId}`,
            state: { from: currentPage },
          }}
          className="pokemon-button"
        >
          View Details
        </Button>
          <Button onClick={handleAddToFavorites} className="pokemon-button">
            Add to Favorites
          </Button>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
