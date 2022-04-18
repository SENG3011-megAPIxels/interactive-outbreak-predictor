import React from "react";
import { Container, Header, Footer, LandingMain, LogoImage, LandingImage, LandingImageContainer } from '../components/StyledComponents';
import Logoimg from "./logo.png";
import Mapimg from "./map.png";
import Graphimg from "./graph.png";
import Mapimg2 from "./map2.png";
import Graphimg2 from "./graph2.png";
import { LinkButtonLarge } from "../components/LinkButton";
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
        <LandingImageContainer>
          <LandingImage src={Mapimg} onMouseOver={e => (e.currentTarget.src = Mapimg2)} onMouseOut={e => (e.currentTarget.src = Mapimg)}/>
          <LandingImage src={Graphimg} onMouseOver={e => (e.currentTarget.src = Graphimg2)} onMouseOut={e => (e.currentTarget.src = Graphimg)}/>
        </LandingImageContainer>
        <LinkButtonLarge to={'./map'} onClick={() => page.setPage(0)} value="Begin!"/>
      </LandingMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}

export default Landing;
