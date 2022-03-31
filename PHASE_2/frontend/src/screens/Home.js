import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Slider from '@mui/material/Slider';
import { StoreContext } from '../Store';
import MapChart from "../components/MapChart";
import Modal from "../components/Modal";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Header = styled.div`
  flex: 1;
  display: flex;
  background: red;
`

const Footer = styled.div`
  flex: 1;
  display: flex;
  background: red;
`

const Main = styled.div`
  flex: 15;
  display: flex;
`

const MapContainer = styled.div`
  flex: 10;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const StyledSlider = styled(Slider)`
  flex: 1;
  margin-top: -100px;
  bottom: -80px !important;
  width: 75vw !important;
`

function Home () {
  const { modal, sliderVal } = React.useContext(StoreContext);
  const [content, setContent] = useState("");
  const [value2, setValue2] = useState(2017);

  return (
    <Container>
      <Header>
        Header
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
        Footer
      </Footer>
    </Container>
  );
}

export default Home;
