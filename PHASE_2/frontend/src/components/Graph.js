import React from "react";
import { StoreContext } from '../Store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// function getURL(country, graph) {
//     switch (graph) {
//         case "":
            
//             break;
    
//         default:
//             break;
//     }
// }

const Graph = ({data}) => {
    

    // React.useEffect(async () => {
    //     const response = await fetch(, {
    //       method: 'GET',
    //       headers: {
    //         Accept: 'application/json',
    //       },
    //     });
    //     const json = await response.json();
    //     if (response.ok) {
    //       //console.log(JSON.parse(json.body).CHN);
    //       setCovidData(JSON.parse(json.body));
    //     } else {
    //       console.log('error');
    //     }
    //   }, [])

    return (
        <ResponsiveContainer width="99%" height={1} padding={0}>
            <LineChart
            data={data}
            margin={{
                top: 305,
                right: 30,
                left: 20,
                bottom: 205,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export { Graph }