import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { StoreContext } from '../Store';
import { StyledSelect } from './StyledComponents';

const HomeDropDown = ({ setTooltipContent }) => {
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

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
};

function GraphDropDown({ graphType }) {
  const { graphChoice } = React.useContext(StoreContext);
  const [alignment, setAlignment] = React.useState(graphChoice.graphChoice);
  if (!["Disease", "Financial", "Jobs"].includes(graphType))
    return null;
  
  const handleChange = (event) => {
    setAlignment(event.target.value)
    graphChoice.setGraphChoice(event.target.value)
  };

  var options = [];
  switch (graphType) {
    case "Disease":
      options = ["Cases", "Deaths"];
      break;
    case "Financial":
      options = ["Stocks", "Exchange Rate"];
      break;
    default:
      //TODO: add jobs
      options = [ "Accounting & Finance Jobs",
        "Teaching Jobs",
        "Domestic Help & Cleaning Jobs",
        "PR, Advertising & Marketing Jobs",
        "Trade & Construction Jobs",
        "IT Jobs",
        "Social Work Jobs",
        "Hopitality & Catering Jobs",
        "Travel Jobs",
        "Manufacturing Jobs",
        "Engineering Jobs",
        "Scientific & QA Jobs",
        "Admin Jobs",
        "Consultancy Jobs",
        "Legal Jobs",
        "Sales Jobs" ];
  }

  return (
    <Dropdown 
      label="Focus"
      options={options}
      value={alignment}
      onChange={handleChange}
    />
  );
}

export { GraphDropDown, HomeDropDown }
