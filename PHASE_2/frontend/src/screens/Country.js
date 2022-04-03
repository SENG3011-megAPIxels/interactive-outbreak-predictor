import React, { useState } from "react";
import { StoreContext } from '../Store';
import { LinkButton } from '../components/LinkButton';
import { GraphGrid, Graph } from '../components/GraphGrid';
import { Container, Header, Footer, CountryMain, GridElement } from '../components/StyledComponents'

function Country () {
  const { page, modal, country } = React.useContext(StoreContext);

  return (
    <Container>
      <Header>
        <LinkButton to={'/'}
          onClick={() => {modal.setModal(2); page.setPage(0)}}
          style={{border: "solid 1px white"}}
          value="Back"/>
        {country.country}'s Graphs and Predictions
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
