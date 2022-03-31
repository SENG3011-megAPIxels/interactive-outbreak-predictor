import React, { useState } from "react";
import { StoreContext } from '../Store';
import { LinkButton } from '../components/LinkButton';

function Country () {
  const { page } = React.useContext(StoreContext);

  const route = window.location.pathname;
  const country = route.split('/')[2];
  return (
    <>
      <h1>{country} Stats and Graphs</h1>
      <LinkButton to={'/'} onClick={() => page.setPage(0)} value="Back"/>
    </>
  );
}

export default Country;
