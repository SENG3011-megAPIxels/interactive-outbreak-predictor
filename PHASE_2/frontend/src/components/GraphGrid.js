import React, { PureComponent } from 'react';
import { StoreContext } from '../Store';
import { Grid } from '@mui/material';
import { GridContainer, GridElement } from './StyledComponents';
import { Graph } from './Graph';

const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
  ];



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
    const { country, graph } = React.useContext(StoreContext);
    var countryISO = country.country.toUpperCase().substring(0,3);
    var url = `https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/futureunemployment?country=` + countryISO; var aData;
    // switch (graph.graph) {
    //     case "Disease":
    //         url = "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/futureunemployment?country=" + countryISO;
    //         break;
    //     case "Jobs Market":
    //         url = "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/futureunemployment?country=" + countryISO;
    //     default:
    //         break;
    // }

    React.useEffect(async () => {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
        const json = await response.json();
        if (response.ok) {
            console.log(json.body);
        //   console.log(JSON.parse(json.body));
        //   aData = JSON.parse(json.body);
        } else {
        //   console.log('error');
        }
      }, [])

    return (   
        <Graph data={data}/>
        // <GridContainer >
        //     <Grid container spacing={1}>
        //         <Grid container item spacing={2}>
        //             <FormRow />
        //         </Grid>
        //         <Grid container item spacing={2}>
        //             <FormRow />
        //         </Grid>
        //     </Grid>
        // </GridContainer>
    );
}

export { GraphGrid }