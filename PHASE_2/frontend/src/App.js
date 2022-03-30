import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Slider from '@mui/material/Slider';
import { StoreContext } from './Store';

import "./styles.css";

import MapChart from "./MapChart";

function App() {
  const { sliderVal } = React.useContext(StoreContext);
  const [content, setContent] = useState("");
  const [value, setValue] = useState(2017);

  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      <Slider
        aria-label="Timeline"
        defaultValue={2017}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1995}
        max={2017}
        value={sliderVal.sliderVal}
        onChange={(_, value) => sliderVal.setSliderVal(value)}
      />
    </div>
  );
}

export default App;
