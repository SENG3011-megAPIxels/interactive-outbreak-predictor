import React, { useState } from "react";
import { StoreContext } from '../Store';
import { LinkButton } from '../components/LinkButton';
import { Container, Header, Footer, CountryMain } from '../components/StyledComponents'

function Country () {
  const { page, modal, country } = React.useContext(StoreContext);

  return (
    <Container>
      <Header>
        Epidemic Predictor by megAPIxels
      </Header>
      <CountryMain>
        <h1>{country.country}</h1>
        Complete Stats and Graphs Here (tabs?)
        <LinkButton to={'/'} onClick={() => {modal.setModal(2); page.setPage(0)}} value="Back"/>
      </CountryMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}

export default Country;
