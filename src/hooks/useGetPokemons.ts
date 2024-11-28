import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';


export interface Pokemon {
  id: string;
  name: string;
  number: string;
  types: string[];
  image: string;
};

export interface PokemonOption {
  id: Pokemon['id'];
  number: Pokemon['number'];
  name: Pokemon['name'];
  types: string;
  image: Pokemon['image'];
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      types
      image
    }
  }
`;

export const useGetPokemons = (searchText: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons
            .filter((p: Pokemon) => 
              p.name.toLowerCase().indexOf(searchText.trim().toLowerCase()) >= 0
            ).map((p: Pokemon) => ({ ...p, types: p.types.join(',') })),
    [pokemons, searchText]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};
