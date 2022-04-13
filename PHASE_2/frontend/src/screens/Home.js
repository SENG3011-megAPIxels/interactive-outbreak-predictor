import React from "react";
import ReactTooltip from "react-tooltip";
import { StoreContext } from '../Store';
import MapChart from "../components/MapChart";
import Modal from "../components/Modal";
import DropDown from "../components/DropDown";
import { Container, Header, Footer, Main, MapContainer, StyledSlider, LogoImage } from '../components/StyledComponents';
import Logoimg from "./logo.png"

function Home () {
  const { sliderVal } = React.useContext(StoreContext);
  const [content, setContent] = React.useState("");
  const [value2, setValue2] = React.useState(28);
  const { page } = React.useContext(StoreContext);

  const marks = [
    {
      value: 1,
      label: 'Dec 2019',
    },
    {
      value: 4,
      label: 'Mar 2020',
    },
    {
      value: 7,
      label: 'Jun 2020',
    },
    {
      value: 10,
      label: 'Sep 2020',
    },
    {
      value: 13,
      label: 'Dec 2020',
    },
    {
      value: 16,
      label: 'Mar 2021',
    },
    {
      value: 19,
      label: 'Jun 2021',
    },
    {
      value: 22,
      label: 'Sep 2021',
    },
    {
      value: 25,
      label: 'Dec 2021',
    },
    {
      value: 28,
      label: 'Mar 2022',
    }
  ];

  const updateSlider = (value) => {
    setValue2(value)
    switch(value) {
      case 1:
        sliderVal.setSliderVal('12-19');
        break;
      case 2:
        sliderVal.setSliderVal('01-20');
        break;
      case 3:
        sliderVal.setSliderVal('02-20');
        break;
      case 4:
        sliderVal.setSliderVal('03-20');
        break;
      case 5:
        sliderVal.setSliderVal('04-20');
        break;
      case 6:
        sliderVal.setSliderVal('05-20');
        break;
      case 7:
        sliderVal.setSliderVal('06-20');
        break;
      case 8:
        sliderVal.setSliderVal('07-20');
        break;
      case 9:
        sliderVal.setSliderVal('08-20');
        break;
      case 10:
        sliderVal.setSliderVal('09-20');
        break;
      case 11:
        sliderVal.setSliderVal('10-20');
        break;
      case 12:
        sliderVal.setSliderVal('11-20');
        break;
      case 13:
        sliderVal.setSliderVal('12-20');
        break;
      case 14:
        sliderVal.setSliderVal('01-21');
        break;
      case 15:
        sliderVal.setSliderVal('02-21');
        break;
      case 16:
        sliderVal.setSliderVal('03-21');
        break;
      case 17:
        sliderVal.setSliderVal('04-21');
        break;
      case 18:
        sliderVal.setSliderVal('05-21');
        break;
      case 19:
        sliderVal.setSliderVal('06-21');
        break;
      case 20:
        sliderVal.setSliderVal('07-21');
        break;
      case 21:
        sliderVal.setSliderVal('08-21');
        break;
      case 22:
        sliderVal.setSliderVal('09-21');
        break;
      case 23:
        sliderVal.setSliderVal('10-21');
        break;
      case 24:
        sliderVal.setSliderVal('11-21');
        break;
      case 25:
        sliderVal.setSliderVal('12-21');
        break;
      case 26:
        sliderVal.setSliderVal('01-22');
        break;
      case 27:
        sliderVal.setSliderVal('02-22');
        break;
      default:
        sliderVal.setSliderVal('03-22');
        break;
    }
  };

  return (
    <Container>
      <Header>
        {/* <Logo src={Logoimg} alt = "logo"/> */}
        <LogoImage src={Logoimg}/>
        Interactive Outbreak Predictor
        {/* <LinkButton to={'./help'} onClick={() => page.setPage(2)} value="Help"/> */}
        <DropDown/>
      </Header>
      <Main>
        <MapContainer>
          <MapChart setTooltipContent={setContent} />
          <ReactTooltip>{content}</ReactTooltip>
          <StyledSlider
            aria-label="Timeline"
            defaultValue={28}
            step={1}
            marks={marks}
            min={1}
            max={28}
            value={value2}
            onChange={(_, value) => updateSlider(value)}
            //onChangeCommitted={(_, value) => updateSlider(value)}
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
