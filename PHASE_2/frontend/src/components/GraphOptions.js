import React from 'react';
import { GraphOptionsMain, GraphSingleOption } from './StyledComponents';
import { LinkButton } from './LinkButton';
import { StoreContext } from '../Store';
import { CountryDropDown, DropDown, GraphDropDown } from './DropDown';

function GraphOptions () {
  const { country, graph, prediction } = React.useContext(StoreContext);

  if (graph.graph == 'Jobs' || graph.graph == 'Financial')
    return (<GraphOptionsMain>
      <h2 style={{textAlign: 'center'}}>Options</h2>
      <GraphDropDown graphType={graph.graph}/>
    </GraphOptionsMain>)
  else if (graph.graph != 'Disease')
      return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    prediction.setPrediction({
      'social_distancing': event.target[0].checked,
      'masks': event.target[1].checked,
      'lockdown': event.target[3].checked,
    });
  }  
  return (
    <GraphOptionsMain>
      <h2 style={{textAlign: 'center'}}>Options</h2>
      <form onSubmit={handleSubmit}>
        <GraphSingleOption>
          <input type="checkbox" id="socialDist" name="socialDist" value="yes"/>
          <label htmlFor="socialDist"> Social Distancing </label>
        </GraphSingleOption>
        <span/>
        <GraphSingleOption>
          <input type="checkbox" id="masks" name="masks" value="yes"/>
          <label htmlFor="masks"> Masks </label>
        </GraphSingleOption>
        <GraphSingleOption>
          <input type="checkbox" id="vaxMandate" name="vaxMandate" value="yes" disabled={true}/>
          <label htmlFor="vaxMandate" style={{color: 'grey'}}> Vaccine Mandate </label>
        </GraphSingleOption>
        <GraphSingleOption>
          <input type="checkbox" id="lockdown" name="lockdown" value="yes"/>
          <label htmlFor="lockdown"> Lockdown </label>
        </GraphSingleOption>
        <button type="submit" className='Button'> Predict! </button>
      </form>
      <GraphDropDown graphType={graph.graph}/>
      <CountryDropDown graphType={graph.graph}/>
    </GraphOptionsMain>
  );
}

export default GraphOptions;
