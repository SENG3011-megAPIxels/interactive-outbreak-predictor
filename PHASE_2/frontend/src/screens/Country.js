import React from "react";
import { StoreContext } from '../Store';
import { LinkButton2 } from '../components/LinkButton';
import { GraphGrid } from '../components/GraphGrid';
import { Container, Header, Footer, CountryMain } from '../components/StyledComponents'
import { GraphSwap } from "../components/ButtonRow";
import GraphOptions from "../components/GraphOptions";
import Logoimg from "./logo.png"

function Country () {
  const { page, modal, country, graph } = React.useContext(StoreContext);
  return (
    // <Graph country={country.country.NAME}/>
    <Container>
      <Header>
        <img src={Logoimg} height={"80px"} width={"180px"} alignItems={'left'} justifyContent={'left'} />
        {country.country.NAME}'s {graph.graph} Graphs
        <LinkButton2 to={'/'} onClick={() => {modal.setModal(2); page.setPage(0)}} value="Back"/>
      </Header>
      <CountryMain>
        <GraphGrid/>
        <GraphSwap/>
        <GraphOptions/>
      </CountryMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}

export default Country;
