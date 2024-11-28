import { Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem } from '@material-ui/core';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetPokemonDetails } from '../../hooks/useGetPokemonDetails';
import clsx from 'clsx';

export const PokemonModal: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [ searchParams ] = useSearchParams();

    const id: string = searchParams.get("id") || "";
    const name: string = searchParams.get("name") || "";

    const { pokemonOptions, pokemonImage, pokemonDetails, loading } = useGetPokemonDetails(id, name);

    const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        navigate(`/pokemon`);
    };

    return (
        <Dialog onClose={handleClose} open={!!id} className={classes.root}>
            <DialogTitle className={classes.dialogItems}>Pokemon Details</DialogTitle>
            <DialogContent className={classes.dialogItems}>
                {pokemonDetails == null && !loading && "Details not found."}
                {pokemonImage && <img src={pokemonImage} alt={`${pokemonOptions.name} image`} className={classes.pokemonImage} loading="lazy" /> } 
                {pokemonOptions &&
                    Object.entries(pokemonOptions).map(([k,v], index) => 
                    <List key={`modal_${index}_${id}`}>
                        <ListItem>
                            <span className={classes.keyName}>{k}</span>: {v}
                        </ListItem>
                    </List>
                )}
                {loading && <div>Loading...</div>}
            </DialogContent>
            <DialogActions className={clsx(classes.dialogItems, classes.borderTop)}>
                <button onClick={handleClose} color="primary">
                    Close
                </button>
            </DialogActions>
        </Dialog>
    );
}

const useStyles = createUseStyles(
    {
        root: {
            "& *": {
              textAlign: 'center'
            }
        },
        keyName: {
          textTransform: "capitalize",
          fontWeight: 500
        },
        pokemonImage: {
          maxHeight: '100px',
          width: "auto"
        },
        dialogItems: {
            background: 'rgb(19, 25, 36)',
            "& button": {
                background: 'rgb(19, 25, 36)',
                cursor: 'pointer'
            }
        },
        borderTop:{ 
            borderTop: '1px solid black'
        }
    },
    { name: 'PokemonModal' }
);
