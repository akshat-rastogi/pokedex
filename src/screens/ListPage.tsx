import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonList } from '../components';
import { PokemonSearch } from '../components';

export const ListPage = () => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState<string>('');

  return (
    <div className={classes.root}>
      <PokemonSearch searchText={searchText} setSearchText={setSearchText}/>  
      <PokemonList searchText={searchText}/>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
