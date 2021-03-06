import React from "react";
import { StoreContext } from '../Store';
import { LinkButton } from '../components/LinkButton';
import { GraphGrid } from '../components/GraphGrid';
import { Container, Header, Footer, CountryMain, LogoImage, GraphOptionsMain } from '../components/StyledComponents'
import { GraphSwap } from "../components/ButtonRow";
import GraphOptions from "../components/GraphOptions";
import Logoimg from "./logo.png";

// Accounts for apostrophe postioning for country names that end with 's'
function EndsWith() {
  const {country} = React.useContext(StoreContext);
  const CountryName = country.country.NAME;
  const last = CountryName.charAt(CountryName.length - 1);
  if (last == 's') {
    return (
      <header>{CountryName}'</header>
    );
  } else {
    return (
      <header>{CountryName}'s</header>
    );
  }
}

function Country () {
  const { page, modal, country, graph, diseaseView } = React.useContext(StoreContext);
  const CountryName = country.country.NAME;
  const last = CountryName.charAt(CountryName.length - 1);
    return (
      <Container>
        <Header>
          <LogoImage src={Logoimg}/>
          <div style={{display: 'flex'}}>
            {EndsWith()}&nbsp;{graph.graph} Graphs
          </div>
          <LinkButton to={'./map'} onClick={() => {modal.setModal(2); page.setPage(0); diseaseView.setDiseaseView('Country')}} value="Back"/>
        </Header>
        <CountryMain>
          <GraphSwap/>
          <div style={{width: "90%", height: 0}}>
            <GraphGrid/>
          </div>
          <GraphOptions/>
        </CountryMain>
        <Footer>
          &copy; megAPIxels 2022
        </Footer>
      </Container>
    );
  }


export default Country;
