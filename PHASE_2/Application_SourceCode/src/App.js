import React from 'react';
import Landing from './screens/Landing';
import Map from './screens/Map';
import Country from './screens/Country';
import Help from './screens/Help';
import Preferences from './screens/Preferences';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store';

/* setPage values:
  Map = setPage(0);
  Country = setPage(1);
  Help = setPage(2);
  Preferences = setPage(3);
  Landing = setPage(4);
*/

function App () {
  <Switch>
    <Route exact path="/" component={Landing}/>
    <Route path="/map" component={Map}/>
    <Route path="/country" component={Country}/>
    <Route path="/help" component={Help}/>
    <Route path="/preferences" component={Preferences}/>
  </Switch>

  React.useContext(StoreContext);
  const route = window.location.pathname;
  if (route === '/') {
    return (
      <Landing/>
    );
  } else if (route === '/map') {
    return (
      <Map/>
    );
  } else if (route.includes('/country')) {
    return (
      <Country/>
    );
  } else if (route === '/help'){
    return(
      <Help/>
    );
  } else if (route === '/preferences'){
    return(
      <Preferences/>
    );
  } else{
    return (
      <h1>Page Not Found!</h1>
    )
  }
}

export default App;
