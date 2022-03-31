import React from 'react';
import { StoreContext } from '../Store';
import { Grid, Box, Paper, styled } from '@mui/material';
import { GridContainer, GridElement } from './StyledComponents';

function FormRow() {
    const { page, modal, country } = React.useContext(StoreContext);
    return (
        <React.Fragment>
            <Grid item xs={4}>
                <GridElement>
                    <img src={require('../graph.png')}></img>
                    Muffins Sold in {country.country}
                </GridElement>
            </Grid>
            <Grid item xs={4}>
                <GridElement>
                    <img src={require('../graph.png')}></img>
                    Muffins Sold in {country.country}
                </GridElement>
            </Grid>
            <Grid item xs={4}>
                <GridElement>
                    <img src={require('../graph.png')}></img>
                    Muffins Sold in {country.country}
                </GridElement>
            </Grid>
        </React.Fragment>
    );
  }

function GraphGrid() {
    
    return (
        <GridContainer >
            <Grid container spacing={1}>
                <Grid container item spacing={2}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={2}>
                    <FormRow />
                </Grid>
                <Grid container item spacing={2}>
                    <FormRow />
                </Grid>
            </Grid>
        </GridContainer>
    );
}

export { GraphGrid }