import React from "react";
import { Container, Header, Footer, LandingMain, LogoImage } from '../components/StyledComponents';
import Logoimg from "./logo.png";
import { LinkButton } from "../components/LinkButton";
import { StoreContext } from '../Store';

function Landing () {
  const { page } = React.useContext(StoreContext);

  return (
    <Container>
      <Header>
        <LogoImage src={Logoimg}/>
        Welcome To Interactive Outbreak Predictor!
        <div></div>
      </Header>
      <LandingMain>
        <div>Map Pic</div>
        <div>Graph Pic</div>
        <LinkButton to={'./map'} onClick={() => page.setPage(0)} value="Begin"/>
      </LandingMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}

export default Landing;
