import React, { PureComponent, useState } from 'react';
import { StoreContext } from '../Store';
import { Grid } from '@mui/material';
import { GridContainer, GridElement } from './StyledComponents';
import { Graph } from './Graph';

const lookup = require('country-code-lookup');

function JobData() {
    console.log('help');
    const { country, graphData, options } = React.useContext(StoreContext);
    const [data, setData] = React.useState([]);
    var countryISO = lookup.byCountry(country.country).iso3;
    var url = "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/futureunemployment?country=" + countryISO;
    
    React.useEffect(async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
        console.log('got data');
        const json = await response.json();
        if (response.ok) {
            setData(JSON.parse(json.body));
        } else {
            console.log('error');
        }

        // dates
        var labels = Object.keys(data);
        var dataset = [];
        labels.forEach(date => {
            dataset.push(data[date]['percOfUnempl']);
        });

        var dataU = {
            labels,
            datasets: [
                {
                    label: '% of Unemployed',
                    data: dataset,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ]
        };
        var optionsU = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Covid Cases',
                },
            },
        };

        console.log("setting data");
        graphData.setGraphData(dataU);
        options.setOptions(optionsU);
        
    }, [])
}


function FormRow() {
    return (
        <React.Fragment>
            <Grid item xs={4}>
                <GridElement>
                    <Graph/>
                </GridElement>
            </Grid>
            <Grid item xs={4}>
                <GridElement>
                    <Graph/>
                </GridElement>
            </Grid>
            <Grid item xs={4}>
                <GridElement>
                    <Graph/>
                </GridElement>
            </Grid>
        </React.Fragment>
    );
  }

function GraphGrid() {
    const { graphData, options } = React.useContext(StoreContext);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("test");
                JobData();
                console.log('done');
                setIsLoading(false);
            } catch (error) {
                setIsLoading(true);
            }
        }
        fetchData();
    }, [])

    if (isLoading) {
       return <div>Loading</div>       
    } else {
        
        return (
            <Graph data={graphData.graphData} options={options.options}/>
        )
    }


    // return (   
    //     <Graph data={graphData.graphData} options={options.options}/>
    //     // <GridContainer >
    //     //     <Grid container spacing={1}>
    //     //         <Grid container item spacing={2}>
    //     //             <FormRow />
    //     //         </Grid>
    //     //         <Grid container item spacing={2}>
    //     //             <FormRow />
    //     //         </Grid>
    //     //     </Grid>
    //     // </GridContainer>
    // );
}

export { GraphGrid }