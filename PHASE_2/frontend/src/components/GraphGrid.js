import React, { Component, PureComponent, useState } from 'react';
import { StoreContext } from '../Store';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const lookup = require('country-code-lookup');
const url = {
    'Disease': "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/countrycovid?country=",
    'Jobs Market': "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/futureunemployment?country=",
    'Financial': {
        'Stocks': "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/stocks?country=",
        'Exchange': "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/exchrate?country="
    }
}


function GraphGrid() {
    const { graph, country } = React.useContext(StoreContext);

    var cURL = url[graph.graph];
    return <Graph country={country.country.NAME} graphType={graph.graph} url={cURL}/>;
}

class Graph extends Component {

    constructor(props) {
        super(props)
        this.state = {
            country: this.props.country,
            graph: this.props.graphType,
            url: this.props.url,
            data: {},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                },
            }
        }
    }

    // update data after loading is shown on screen
    componentDidMount() {
        getGraphData(this.state.country, this.state.url).then(
            gData => parseData(gData, this.state.graph).then(resp => {
                this.setState({
                    data: resp,
                })
            })
        );
    }

    // on state change - change data
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            getGraphData(this.state.country, this.props.url).then(
                gData => parseData(gData, this.state.graph).then(resp => {
                        this.setState({
                            graph: this.props.graphType,
                            url: this.props.url,
                            data: resp
                        })
                    })
            )
        }
    }

    render() {
        return (this.state.data && Object.keys(this.state.data).length == 0) ? (
            <div>
                Loading
            </div>
        ) : (
            <div style={{width: "80%", height: 0}}>
                <Line options={this.state.options} data={this.state.data}/>
            </div>
        );
    }
}

// depending on the current clicked graph, get the
// corresponding data from the api and parse it
async function getGraphData(country, url) {
    if (country == "United States of America")
        country = "United States"
    const countryISO = lookup.byCountry(country).iso3;

    var cURL = url + countryISO;
    
    let resp = await fetch(cURL);
    let respJSON = await resp.json();

    return JSON.parse(respJSON.body);

}

// parse the data depending on the graphType
async function parseData(data, graphType) {
    switch (graphType) {
        case "Disease":
            
            break;
        case "Jobs Market":
            return parseJobData(data);
        default:
            break;
        }
    return parseJobData(data);
} 


// parse the unemployment data received from the api
// and return it in the required format for a graph
async function parseJobData(data) {
    // dates
    var labels = Object.keys(data);
    var dataset = [];
    console.log(labels)
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

    return dataU;
}

export { GraphGrid }








// async function JobData(country) {
//     const [data, setData] = React.useState([]);
//     var countryISO = lookup.byCountry(country).iso3;
//     var url = "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/futureunemployment?country=" + countryISO;
    
//     React.useEffect(async () => {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 Accept: 'application/json',
//             },
//         });
//         console.log('got data');
//         const json = await response.json();
//         if (response.ok) {
//             setData(JSON.parse(json.body));
//         } else {
//             console.log('error');
//         }

//         // dates
//         var labels = Object.keys(data);
//         var dataset = [];
//         labels.forEach(date => {
//             dataset.push(data[date]['percOfUnempl']);
//         });

//         var dataU = {
//             labels,
//             datasets: [
//                 {
//                     label: '% of Unemployed',
//                     data: dataset,
//                     borderColor: 'rgb(255, 99, 132)',
//                     backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                 }
//             ]
//         };
        
//         console.log(dataU);
        
//     }, [])
// }



// function GraphGrid() {
//     const { graph } = React.useContext(StoreContext);
//     const [data, setData] = React.useState([]);
//     const [isBusy, setBusy] = React.useState(true);

//     switch (graph.graph) {
//         case "Jobs Market":
//             return <UnGraph></UnGraph>;
//         case "Disease":
//             return <CovidGraph></CovidGraph>;
//         case "Financial":
//             return <ExchGraph></ExchGraph>
//         default:
//             return <CovidGraph></CovidGraph>;
//     }













//         // const { country, graphData, options } = React.useContext(StoreContext);
//         // const [isLoading, setIsLoading] = React.useState(true);
    
//         // React.useEffect(() => {
    
//         // }, [])
    
//         // React.useEffect(() => {
//         //     const fetchData = async () => {
//         //         try {
//         //             console.log("test");
//         //             JobData(country);
//         //             setIsLoading(false);
//         //         } catch (error) {
//         //             setIsLoading(true);
//         //         }
//         //     }
//         //     fetchData();
//         // }, [])
//         // if (isLoading) {
//     //    return <div>Loading</div>       
//     // } else {
//     // }
// }

// export { GraphGrid }