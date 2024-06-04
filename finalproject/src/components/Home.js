import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { Form, Row, Col, Container } from 'react-bootstrap';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = ({ addToFavorites, search }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [weightRange, setWeightRange] = useState({ min: 0, max: 1000 });
  const [heightRange, setHeightRange] = useState({ min: 0, max: 100 });
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        const pokemonList = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              types: pokemonData.types.map((type) => type.type.name),
              weight: pokemonData.weight,
              height: pokemonData.height,
              url: pokemon.url,
            };
          })
        );
        setPokemonData(pokemonList);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type');
        const data = await response.json();
        setTypes(data.results.map(type => type.name));
      } catch (error) {
        console.error('Error fetching Pokemon types:', error);
      }
    };

    fetchPokemonData();
    fetchTypes();
  }, []);

  const handleWeightChange = (e) => {
    setWeightRange({
      ...weightRange,
      [e.target.name]: e.target.value,
    });
  };

  const handleHeightChange = (e) => {
    setHeightRange({
      ...heightRange,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <Container className="home">
      <Form
        style={{
          position: 'sticky',
          top: '60px', 
          zIndex: 1000,
          marginBottom: '20px',
          padding: '10px',
        }}
      >
        <Row className="filters mb-3">
          <Col>
            <Form.Group controlId="weightMin">
              <Form.Label>Weight (min):</Form.Label>
              <Form.Control
                type="number"
                name="min"
                value={weightRange.min}
                onChange={handleWeightChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="weightMax">
              <Form.Label>Weight (max):</Form.Label>
              <Form.Control
                type="number"
                name="max"
                value={weightRange.max}
                onChange={handleWeightChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="heightMin">
              <Form.Label>Height (min):</Form.Label>
              <Form.Control
                type="number"
                name="min"
                value={heightRange.min}
                onChange={handleHeightChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="heightMax">
              <Form.Label>Height (max):</Form.Label>
              <Form.Control
                type="number"
                name="max"
                value={heightRange.max}
                onChange={handleHeightChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="typeSelect">
              <Form.Label>Type:</Form.Label>
              <Form.Control as="select" value={selectedType} onChange={handleTypeChange}>
                <option value="">All</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <div className="pokemon-list">
        {pokemonData
          .filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          )
          .filter((pokemon) =>
            selectedType ? pokemon.types.includes(selectedType) : true
          )
          .filter((pokemon) =>
            pokemon.weight >= weightRange.min && pokemon.weight <= weightRange.max
          )
          .filter((pokemon) =>
            pokemon.height >= heightRange.min && pokemon.height <= heightRange.max
          )
          .map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              addToFavorites={addToFavorites}
            />
          ))}
      </div>
    </Container>
  );
};

export default Home;


