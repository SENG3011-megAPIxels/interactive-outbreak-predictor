import React, { useState } from "react";
import { StoreContext } from '../Store';
import { LinkButton2 } from '../components/LinkButton';
import { GraphGrid, Graph } from '../components/GraphGrid';
import { Container, Header, Footer, CountryMain, GridElement } from '../components/StyledComponents'
import { GraphSwap } from "../components/ButtonRow";

function Country () {
  const { page, modal, country, graph } = React.useContext(StoreContext);

  return (
    <Container>
      <Header>
        {country.country}'s {graph.graph} Graphs
        <LinkButton2 to={'/'} onClick={() => {modal.setModal(2); page.setPage(0)}} value="Back"/>
      </Header>
      <CountryMain>
        <GraphGrid/>
        <GraphSwap/>
      </CountryMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}

export default Country;
