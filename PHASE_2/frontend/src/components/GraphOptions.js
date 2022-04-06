import React from 'react';
import { GraphOptionsMain, GraphSingleOption } from './StyledComponents';
import { LinkButton } from './LinkButton';
import { StoreContext } from '../Store';

function GraphOptions () {
  const { country } = React.useContext(StoreContext);

  return (
    <GraphOptionsMain>
      <GraphSingleOption>
        <input type="checkbox" id="socialDist" name="socialDist" value="yes"/>
        <label htmlFor="socialDist"> Social Distancing </label>
      </GraphSingleOption>
      <GraphSingleOption>
        <input type="checkbox" id="masks" name="masks" value="yes"/>
        <label htmlFor="masks"> Masks </label>
      </GraphSingleOption>
      <GraphSingleOption>
        <input type="checkbox" id="vaxMandate" name="vaxMandate" value="yes"/>
        <label htmlFor="vaxMandate"> Vaccine Mandate </label>
      </GraphSingleOption>
      <GraphSingleOption>
        <input type="checkbox" id="lockdown" name="lockdown" value="yes"/>
        <label htmlFor="lockdown"> Lockdown </label>
      </GraphSingleOption>
      <LinkButton to={`/country/${country.country.NAME}`} onClick={() => {}} value="Predict!"/>
    </GraphOptionsMain>
  );
}

export default GraphOptions;
