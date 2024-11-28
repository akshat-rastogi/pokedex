import React from 'react';
import { createUseStyles } from 'react-jss';

interface PokemonSearchProps {
    searchText: string;
    setSearchText: (searchText: string) => void;
}

export const PokemonSearch: React.FC<PokemonSearchProps> = ({ searchText, setSearchText }) => {
    const classes = useStyles();
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value ?? '');
    };

    const handleClearText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setSearchText('');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <input 
                id="searchText"
                type="text"
                placeholder="Search"
                className={classes.searchBox}
                value={searchText}
                onChange={handleOnChange}
            />
            <button onClick={handleClearText}>
                Reset
            </button>
        </form>
    );
};

const useStyles = createUseStyles(
    {
        root: {
            width: '100%',
            textAlign: 'center',
            padding: '32px',
            boxSizing: 'border-box',
            background: '#131924',
            "& *": {
                color: "#171E2b"
            }
        },
        searchBox: {
            marginRight: "10px",
            padding: "7px 12px"
        }
    },
    { name: 'PokemonSearch' }
);