import React from "react";
import ReactTooltip from "react-tooltip";
import { StoreContext } from '../Store';
import MapChart from "../components/MapChart";
import Modal from "../components/Modal";
import Slider from "../components/Slider";
import { HomeDropDown } from "../components/DropDown";
import { Container, Header, Footer, MapMain, MapContainer, OuterMapContainer, LogoImage } from '../components/StyledComponents';
import Logoimg from "./logo.png";

function Map () {
  const [content, setContent] = React.useState("");
  const { page } = React.useContext(StoreContext);

  return (
    <Container>
      <Header>
        <LogoImage src={Logoimg}/>
        Interactive Outbreak Predictor
        <HomeDropDown/>
      </Header>
      <MapMain>
        <OuterMapContainer>
          <MapContainer>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
          </MapContainer>
          <Slider/>
        </OuterMapContainer>
        <Modal/>
      </MapMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}

export default Map;
