import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Slider from '@mui/material/Slider';
import { StoreContext } from '../Store';
import MapChart from "../components/MapChart";

function Home () {
  const { sliderVal } = React.useContext(StoreContext);
  const [content, setContent] = useState("");
  const [value2, setValue2] = useState(2017);

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
        value={value2}
        onChange={(_, value) => setValue2(value)}
        onChangeCommitted={(_, value) => sliderVal.setSliderVal(value)}
      />
    </div>
  );
}

export default Home;
