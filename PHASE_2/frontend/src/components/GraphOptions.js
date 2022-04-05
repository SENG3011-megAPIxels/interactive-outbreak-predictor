import React from 'react';
import { GraphOptionsMain, GraphSingleOption } from './StyledComponents';
import { LinkButton } from './LinkButton';

function GraphOptions () {
  return (
    <GraphOptionsMain>
      <GraphSingleOption>
        <input type="checkbox" id="socialDist" name="socialDist" value="yes"/>
        <label for="socialDist"> Social Distancing </label>
      </GraphSingleOption>
      <GraphSingleOption>
        <input type="checkbox" id="masks" name="masks" value="yes"/>
        <label for="masks"> Masks </label>
      </GraphSingleOption>
      <GraphSingleOption>
        <input type="checkbox" id="vaxMandate" name="vaxMandate" value="yes"/>
        <label for="vaxMandate"> Vaccine Mandate </label>
      </GraphSingleOption>
      <GraphSingleOption>
        <input type="checkbox" id="lockdown" name="lockdown" value="yes"/>
        <label for="lockdown"> Lockdown </label>
      </GraphSingleOption>
      <LinkButton to={'.'} onClick={() => {}} value="Predict!"/>
    </GraphOptionsMain>
  );
}

export default GraphOptions;
