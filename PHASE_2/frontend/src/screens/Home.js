import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import { StoreContext } from '../Store';
import MapChart from "../components/MapChart";
import Modal from "../components/Modal";
import DropDown from "../components/DropDown";
import { Container, Header, Footer, Main, MapContainer, StyledSlider } from '../components/StyledComponents'

function Home () {
  const { modal, sliderVal } = React.useContext(StoreContext);
  const [content, setContent] = useState("");
  const [value2, setValue2] = useState(2017);

  const marks = [
    {
      value: 1995,
      label: 'Jan 2019',
    },
    {
      value: 2017,
      label: 'Mar 2022',
    }
  ];

  return (
    <Container>
      <Header>
        Pandemic Predictor by megAPIxels
        <DropDown/>
      </Header>
      <Main>
        <MapContainer>
          <MapChart setTooltipContent={setContent} />
          <ReactTooltip>{content}</ReactTooltip>
          <StyledSlider
            aria-label="Timeline"
            defaultValue={2017}
            step={1}
            marks={marks}
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
