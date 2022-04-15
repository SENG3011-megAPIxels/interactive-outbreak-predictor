import React, { Component } from 'react';
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
    'Unemployment': "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/futureunemployment?country=",
    'Financial': {
        'Stocks': "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/stocks?country=",
        'Exchange': "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/exchrate?country="
    },
    'Real Estate': "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/realestate?country=",
    'Jobs': "https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/jobs?country="
}


function GraphGrid() {
    const { graph, country, graphChoice } = React.useContext(StoreContext);

    var cURL = url[graph.graph];
    switch (graph.graph) {
        case "Financial":
            if (graphChoice.graphChoice == "Exchange Rate")
                return <Graph country={country.country.NAME} graphType={graph.graph} url={cURL.Exchange} param={'Exchange'}/>
            else
                return <Graph country={country.country.NAME} graphType={graph.graph} url={cURL.Stocks} param={'Stock'}/>
        case "Disease":
            if (graphChoice.graphChoice == "Deaths")
                return <Graph country={country.country.NAME} graphType={graph.graph} url={cURL} param={'newDeaths'}/>
            else
                return <Graph country={country.country.NAME} graphType={graph.graph} url={cURL} param={'newCases'}/>
        case "Jobs":
            return <Graph country={country.country.NAME} graphType={graph.graph} url={cURL} param={graphChoice.graphChoice}/>
        default:
            return <Graph country={country.country.NAME} graphType={graph.graph} url={cURL} param={'newCases'}/>
    }
}

class Graph extends Component {

    constructor(props) {
        super(props)
        this.state = {
            country: this.props.country,
            graph: this.props.graphType,
            url: this.props.url,
            graphChoice: this.props.param,
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
            gData => parseData(gData, this.state.graph, this.props.param).then(resp => {
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
                gData => parseData(gData, this.props.graphType, this.props.param).then(resp => {
                    this.setState({
                        graph: this.props.graphType,
                        url: this.props.url,
                        graphChoice: this.props.param,
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
async function parseData(data, graphType, param) {
    switch (graphType) {
        case "Disease":
            return parseCovidData(data, param);
        case "Unemployment":
            return parseUnemployData(data);
        case "Financial":
            if (param == 'Stock')
                return parseStockData(data);
            else 
                return parseExchData(data);
        case "Real Estate":
            return parseRealEstateData(data);
        case "Jobs":
            return parseJobData(data, param);    
    }
    return parseUnemployData(data);
} 


// parse the unemployment data received from the api
// and return it in the required format for a graph
async function parseUnemployData(data) {
    // dates
    var labels = Object.keys(data);
    var dataset = [];
    labels.forEach(date => {
        dataset.push(data[date]['percOfUnempl']);
    });

    return {
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
}

// format the covid data to be in the required format
// time on the x-axis, count on the y-axis
async function parseCovidData(data, param) {
    var subregions = Object.keys(data);
    var labels = Object.keys(data[subregions[0]]);
    labels.sort((a, b) => sortDates(a, b));
    var dataset = [];
    subregions.forEach(region => {
        var dates = Object.keys(data[region]);
        var paramVal = [];
        dates.forEach(date => {
            paramVal.push(data[region][date][param]);
        });
        var colour = poolColors(paramVal.length);
        dataset.push(
            {
                label: region,
                data: paramVal,
                backgroundColor: colour,
                borderColor: colour,
            }
        );
    });

    return {
        labels,
        datasets: dataset
    }
}

async function parseExchData(data) {
    var labels = Object.keys(data);
    // remove unnecessary info
    var code = labels.shift();
    labels.shift();
    labels.sort((a, b) => sortDates(a, b));
    var dataset = [];
    labels.forEach(date => {
        dataset.push(data[date]);
    })

    return {
        labels,
        datasets: [
            {
                label: 'Exchange rate of ' + data[code],
                data: dataset,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }
}

async function parseStockData(data) {
    var labels = Object.keys(data);
    labels.sort((a, b) => sortDates(a, b));
    var comp = Object.keys(data[labels[0]]);
    var companySet = {};
    comp.forEach(company => {
        companySet[company] = [];
    });
    labels.forEach(date => {
        Object.keys(data[date]).forEach(company => {
            companySet[company].push(data[date][company]);
        });
    });
    
    var dataR = [];
    Object.keys(companySet).forEach(key => {
        var colour = poolColors(companySet[key].length)
        dataR.push({
            label: key,
            data: companySet[key],
            backgroundColor: colour,
            borderColor: colour,
        })
    });

    return {
        labels,
        datasets: dataR,
    }
}

async function parseRealEstateData(data) {
    var labels = Object.keys(data);
    labels.sort((a, b) => sortDates(a, b))
    var regions = Object.keys(data[labels[0]])
    var regionSet = {}
    regions.forEach(region => {
        regionSet[region] = []
    })
    labels.forEach(date => {
        Object.keys(data[date]).forEach(region => {
            regionSet[region].push(data[date][region]);
        })
    })

    var dataR = [];
    Object.keys(regionSet).forEach(key => {
        var colour = poolColors(regionSet[key].length)
        dataR.push({
            label: key,
            data: regionSet[key],
            backgroundColor: colour,
            borderColor: colour,
        })
    });

    return {
        labels,
        datasets: dataR
    };
}

async function parseJobData(data, param) {
    var labels = Object.keys(data);
    labels.sort((a, b) => sortDates(a, b));
    var jobs = [];
    Object.keys(data[labels[0]]).forEach(jobName => {
        jobs.push(data[labels[0]][jobName]['jobTitle'])
    });

    if (!jobs.includes(param))
        param = "Accounting & Finance Jobs";
    
    var specJobData = [];    
    labels.forEach(date => {
        Object.keys(data[date]).forEach(jobName => {
            if (data[date][jobName]['jobTitle'] == param)
                specJobData.push(data[date][jobName]['avgSalary']);
        })
    })

    return {
        labels,
        datasets: [
            {
                label: param,
                data: specJobData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };
}

// get dynamic colours for each dataset
function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
}

// return those dynamic colours to work with the format
function poolColors(len) {
    var pool = [];
    for(var i = 0; i < len; i++) {
        pool.push(dynamicColors());
    }
    return pool;
}

function sortDates(a, b) {
    var spA = a.split("-");
    var spB = b.split("-");
    // year of a less than year of b
    if (parseInt(spA[1]) < parseInt(spB[1]))
        return -1;
    // year of a and b equal
    else if (parseInt(spA[1]) == parseInt(spB[1]))
        return parseInt(spA[0]) - parseInt(spB[0]);
    // year of b less than year of a
    return 1;
}

export { GraphGrid }
