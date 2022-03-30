import React, { useState } from "react";

function Country () {
  const route = window.location.pathname;
  const country = route.split('/')[2];
  return (
    <h1>{country} Stats and Graphs</h1>
  );
}

export default Country;
