import React, { useState } from "react";
import { StoreContext } from '../Store';
import { LinkButton } from '../components/LinkButton';

function Country () {
  const { page, modal, country } = React.useContext(StoreContext);

  return (
    <>
      <h1>{country.country} Stats and Graphs</h1>
      <LinkButton to={'/'} onClick={() => {modal.setModal(2); page.setPage(0)}} value="Back"/>
    </>
  );
}

export default Country;
