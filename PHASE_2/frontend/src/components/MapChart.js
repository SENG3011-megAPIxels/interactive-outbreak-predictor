import React from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import { StoreContext } from '../Store';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  .domain([0, 2500000])
  .range(["#cee8f0", "darkblue"]);

const MapChart = ({ setTooltipContent }) => {
  const { page, modal, country, sliderVal } = React.useContext(StoreContext);
  const [data, setData] = React.useState([]);
  const [covidData, setCovidData] = React.useState({});

  React.useEffect(() => {
    csv(`/countryCodes.csv`).then((data) => {
      setData(data);
    });
  }, []);

  React.useEffect(async () => {
    const response = await fetch(`https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/globalcovid`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const json = await response.json();
    if (response.ok) {
      //console.log(JSON.parse(json.body).CHN);
      setCovidData(JSON.parse(json.body));
    } else {
      console.log('error');
    }
  }, []);

  return (
    <ComposableMap
      data-tip=""
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 150
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} preserveAspectRatio="none"/>
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} preserveAspectRatio="none"/>
      {data.length > 0 && (
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
              const { NAME, ISO_A3 } = geo.properties;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(`${NAME} - ${covidData[ISO_A3] !== undefined ? covidData[ISO_A3][sliderVal.sliderVal].newCases + ' Cases' : 'Unknown'}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  onClick={() => {
                    country.setCountry(geo.properties);
                    modal.setModal(2);
                  }}
                  //fill={d ? colorScale(d[sliderVal.sliderVal]) : "#F5F4F6"}
                  fill={covidData[ISO_A3] !== undefined ? colorScale(covidData[ISO_A3][sliderVal.sliderVal].newCases) : "#eee"}
                  style={{
                    default: {
                      outline: "none"
                    },
                    hover: {
                      fill: "#ff3333",
                      outline: "none",
                      cursor: "pointer"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      )}
    </ComposableMap>
  );
};

export default MapChart;
