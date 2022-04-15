import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { StoreContext } from '../Store';
import { StyledSelect } from './StyledComponents';

const DropDown = ({ setTooltipContent }) => {
  const { disease } = React.useContext(StoreContext);

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="demo-simple-select-label">Disease</InputLabel>
      <StyledSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={disease.disease}
        label="Disease"
        //onChange={}
      >
        <MenuItem value={"Covid-19"}>Covid-19</MenuItem>
        <MenuItem value={"Coming Soon"}>Coming Soon</MenuItem>
      </StyledSelect>
    </FormControl>
  );
};

function GraphDropDown({ graphType }) {
  const { graphChoice } = React.useContext(StoreContext);
  const [alignment, setAlignment] = React.useState(graphChoice.graphChoice);
  if (!["Disease", "Financial", "Jobs"].includes(graphType))
    return null;
  
  const aligns = {
    'Disease': "Cases",
    'Financial': "Stocks",
    'Jobs': "Test"
  }

  if (alignment != aligns[graphType]) {
    setAlignment(aligns[graphType]);
  }

  const handleChange = (event, newValue) => {
    setAlignment(newValue.props.value)
    graphChoice.setGraphChoice(newValue.props.value)
  };

  const populateDropdown = (graphType) => {
    var options = [];
    switch (graphType) {
      case "Disease":
        options = ["Cases", "Deaths"];
        break;
      case "Financial":
        options = ["Stocks", "Exchange Rate"];
        break;
      case "Jobs":
        //TODO: add jobs
        options = [];
        break;
      default:
        break;
    }
    return options.map(option => (<MenuItem value={option}>{option}</MenuItem>));
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="demo-simple-select-label">Focus</InputLabel>
      <StyledSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={alignment}
        label={graphType}
        onChange={handleChange}
      >
        {populateDropdown(graphType)}
      </StyledSelect>
    </FormControl>
  );
}

export { GraphDropDown, DropDown }
