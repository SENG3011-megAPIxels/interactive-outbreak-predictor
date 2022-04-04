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

export default DropDown;
