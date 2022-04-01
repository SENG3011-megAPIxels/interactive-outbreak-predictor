import React from 'react';
import { StoreContext } from '../Store';
import { Grid } from '@mui/material';
import { GridContainer, GridElement } from './StyledComponents';
import { LineChart } from 'reaviz';

const data = [
    { key: new Date('2/22/2020'), data: 14 },
    { key: new Date('2/25/2020'), data: 5 },
    { key: new Date('2/29/2020'), data: 18 }
];

function FormRow() {
    const { page, modal, country } = React.useContext(StoreContext);
    return (
        <React.Fragment>
            <Grid item xs={4}>
                <GridElement>
                    <LineChart height={250} width={300} data={data}/>
                </GridElement>
            </Grid>
            <Grid item xs={4}>
                <GridElement>
                    <LineChart height={250} width={300} data={data}/>
                </GridElement>
            </Grid>
            <Grid item xs={4}>
                <GridElement>
                    <LineChart height={250} width={300} data={data}/>
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