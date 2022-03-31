import React, { useState } from "react";
import { StoreContext } from '../Store';
import { LinkButton } from '../components/LinkButton';

function Country () {
  const { page, country } = React.useContext(StoreContext);

  return (
    <>
      <h1>{country.country} Stats and Graphs</h1>
      <LinkButton to={'/'} onClick={() => page.setPage(0)} value="Back"/>
    </>
  );
}

export default Country;
