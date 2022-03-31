import React, { useState } from "react";
import { StoreContext } from '../Store';
import { LinkButton } from '../components/LinkButton';
import { GraphGrid } from '../components/GraphGrid';
import { Container, Header, Footer, CountryMain } from '../components/StyledComponents'

function Country () {
  const { page, modal, country } = React.useContext(StoreContext);

  return (
    <Container>
      <Header>
        Pandemic Predictor by megAPIxels
      </Header>
      <CountryMain>
        <h1>{country.country}</h1>
        <GraphGrid />
        <LinkButton to={'/'} onClick={() => {modal.setModal(2); page.setPage(0)}} value="Back"/>
      </CountryMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}

export default Country;
