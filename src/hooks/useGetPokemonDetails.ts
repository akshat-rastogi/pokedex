import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Pokemon, PokemonOption } from './useGetPokemons';

export type PokemonDimension = {
  "minimum": "string",
  "maximum": "string"
};

export interface PokemonDetails extends Pokemon {
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
};

export interface PokemonOptions extends PokemonOption {
    weight: string;
    height: string; 
    weaknesses: string;
    resistant: string;
    classification: PokemonDetails["classification"];
    fleeRate: PokemonDetails["fleeRate"];
    maxCP: PokemonDetails["maxCP"];
    maxHP: PokemonDetails["maxHP"];
};

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
      id
      number
      name
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      types
      resistant
      weaknesses
      classification
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemonDetails = (id: string, name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      id: id, 
      name: name
    },
  });

  const pokemonDetails: PokemonDetails = useMemo(() => data?.pokemon || null, [data]);

  const pokemonOptions: Partial<PokemonOptions> = useMemo(
    () => {
      if (!pokemonDetails) {
        return {};
      }
      return {
        id: pokemonDetails.id,
        number: pokemonDetails.number,
        name: pokemonDetails.name,
        classification: pokemonDetails.classification,
        fleeRate: pokemonDetails.fleeRate,
        maxCP: pokemonDetails.maxCP,
        maxHP: pokemonDetails.maxHP,
        types: pokemonDetails.types.join(', '),  
        resistant: pokemonDetails.resistant.join(', '), 
        weaknesses: pokemonDetails.weaknesses.join(', '),
        weight: `${pokemonDetails.weight.minimum} to ${pokemonDetails.weight.maximum}`,
        height: `${pokemonDetails.height.minimum} to ${pokemonDetails.height.maximum}`
      }
    }, [pokemonDetails, id, name]);

  return {
    pokemonDetails,
    pokemonOptions,
    pokemonImage: pokemonDetails?.image,
    ...queryRes,
  };
};
