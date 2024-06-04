import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Pokemon.css';

const Pokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const handleBackClick = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from.pathname, { state: { offset: location.state.from.offset } });
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pokemon) {
    return <p>Pokemon not found</p>;
  }

  return (
    <div className="pokemon-details">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <p className="pokemon-info"><strong>Height:</strong> {pokemon.height}</p>
      <p className="pokemon-info"><strong>Weight:</strong> {pokemon.weight}</p>
      <p className="pokemon-info"><strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
      <button onClick={handleBackClick} className="back-button">Back to All Pokémon</button>
    </div>
  );
};

export default Pokemon;

