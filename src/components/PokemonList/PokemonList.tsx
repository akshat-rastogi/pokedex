import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { useNavigate, useSearchParams } from "react-router-dom";
import { PokemonModal } from '../PokemonModal';

interface PokemonListProps {
  searchText: string;
}

export const PokemonList: React.FC<PokemonListProps> = ({ searchText }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pokemonOptions, loading } = useGetPokemons(searchText);
  const [searchParams] = useSearchParams();

  const id: string = searchParams.get("id") || "";
  const showPokemonDetails = (id: string, name: string) => {
    navigate(`/pokemon?id=${id}&name=${name}`);
  };

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      {pokemonOptions.map((pokemon) => (
        <div key={pokemon.id} className={classes.pokemon} onClick={() => showPokemonDetails(pokemon.id, pokemon.name)}>
          <div className={classes.pokemonDetails}>
            Number: {pokemon.number}
            <br/>
            Name: {pokemon.name} 
            <br />
            Types: {pokemon.types}
          </div>
          <div className={classes.imageContainer}>
            <img src={pokemon.image} alt={`${pokemon.name} image`} className={classes.pokemonImage} loading="lazy" />
          </div>
              
        </div>
      ))}
      { id != '' && <PokemonModal />}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    pokemon: {
      display: "flex",
      margin: "10px",
      padding: '20px',
      "box-shadow": "0px 0px 2px black inset",
      "& *": {
        width: "50%"
      },
      "&:hover": {
        background: 'rgba(255,255,255,.04)',
        "box-shadow": "0px 0px 15px black",
        cursor: 'pointer'
      },
    },
    pokemonDetails: {
      padding: '10px'
    },
    imageContainer: {
      background: "white",
      maxWidth: '200px'
    },
    pokemonImage: {
      maxHeight: '100px',
      width: "auto"
    }
  },
  { name: 'PokemonList' }
);
