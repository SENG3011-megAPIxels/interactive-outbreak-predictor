import React, { useState } from "react";
import { StoreContext } from '../Store';
import { LinkButton2 } from '../components/LinkButton';
import { GraphGrid, Graph } from '../components/GraphGrid';
import { Container, Header, Footer, CountryMain, GridElement } from '../components/StyledComponents'

function Country () {
  const { page, modal, country } = React.useContext(StoreContext);

  return (
    <Container>
      <Header>
        {country.country}'s Graphs and Predictions
        <LinkButton2 to={'/'} onClick={() => {modal.setModal(2); page.setPage(0)}} value="Back"/>
      </Header>
      <CountryMain>
        <GraphGrid />
      </CountryMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}

export default Country;
