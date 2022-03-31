import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { StoreContext } from '../Store';
import MapChart from "../components/MapChart";
import Modal from "../components/Modal";
import { Container, Header, Footer, Main, MapContainer, StyledSlider } from '../components/StyledComponents'

function Home () {
  const { modal, sliderVal } = React.useContext(StoreContext);
  const [content, setContent] = useState("");
  const [value2, setValue2] = useState(2017);

  const marks = [
    {
      value: 1995,
      label: '1995',
    },
    {
      value: 2017,
      label: '2017',
    }
  ];

  return (
    <Container>
      <Header>
        Epidemic Predictor by megAPIxels
      </Header>
      <Main>
        <MapContainer>
          <MapChart setTooltipContent={setContent} />
          <ReactTooltip>{content}</ReactTooltip>
          <StyledSlider
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
        </MapContainer>
        <Modal/>
      </Main>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}

export default Home;
