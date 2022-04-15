import React from "react";
import ReactTooltip from "react-tooltip";
import { StoreContext } from '../Store';
import MapChart from "../components/MapChart";
import Modal from "../components/Modal";
import Slider from "../components/Slider";
import { DropDown } from "../components/DropDown";
import { Container, Header, Footer, Main, MapContainer, LogoImage } from '../components/StyledComponents';
import Logoimg from "./logo.png";

function Home () {
  const [content, setContent] = React.useState("");
  const { page } = React.useContext(StoreContext);

  return (
    <Container>
      <Header>
        <LogoImage src={Logoimg}/>
        Interactive Outbreak Predictor
        <DropDown/>
      </Header>
      <Main>
        <MapContainer>
          <MapChart setTooltipContent={setContent} />
          <ReactTooltip>{content}</ReactTooltip>
          <Slider/>
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
