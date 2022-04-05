import React from 'react';
import { GraphOptionsMain, GraphSingleOption } from './StyledComponents';
import { LinkButton } from './LinkButton';

function GraphOptions () {
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
      <LinkButton to={'.'} onClick={() => {}} value="Predict!"/>
    </GraphOptionsMain>
  );
}

export default GraphOptions;
