import React, { PureComponent, useState } from 'react';
import { StoreContext } from '../Store';
import { Grid } from '@mui/material';
import { GridContainer, GridElement } from './StyledComponents';
import { Graph, UnGraph } from './UnemGraph';
import { CovidGraph } from './CovidGraph';
import { ExchGraph } from './ExchGraph';

const lookup = require('country-code-lookup');

async function JobData(country) {
    const [data, setData] = React.useState([]);
    var countryISO = lookup.byCountry(country).iso3;
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

        console.log(dataU);
        
    }, [])
}



function GraphGrid() {
    const { graph } = React.useContext(StoreContext);
    const [data, setData] = React.useState([]);
    const [isBusy, setBusy] = React.useState(true);

    switch (graph.graph) {
        case "Jobs Market":
            return <UnGraph></UnGraph>;
        case "Disease":
            return <CovidGraph></CovidGraph>;
        case "Financial":
            return <ExchGraph></ExchGraph>
        default:
            return <CovidGraph></CovidGraph>;
    }













        // const { country, graphData, options } = React.useContext(StoreContext);
        // const [isLoading, setIsLoading] = React.useState(true);
    
        // React.useEffect(() => {
    
        // }, [])
    
        // React.useEffect(() => {
        //     const fetchData = async () => {
        //         try {
        //             console.log("test");
        //             JobData(country);
        //             setIsLoading(false);
        //         } catch (error) {
        //             setIsLoading(true);
        //         }
        //     }
        //     fetchData();
        // }, [])
        // if (isLoading) {
    //    return <div>Loading</div>       
    // } else {
    // }
}

export { GraphGrid }