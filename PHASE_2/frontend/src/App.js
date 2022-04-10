import React from 'react';
import Home from './screens/Home';
import Country from './screens/Country';
import Help from './screens/Help';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store';

/* setPage values:
  Home = setPage(0);
  Country = setPage(1);
*/

function App () {
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/country" component={Country}/>
    <Route path="/help" component={Help}/>
  </Switch>

  React.useContext(StoreContext);
  const route = window.location.pathname;
  if (route === '/') {
    return (
      <Home/>
    );
  } else if (route.includes('/country')) {
    return (
      <Country/>
    );
  } else if (route.includes('/help')){
    return(
      <Help/>
    );
  } else{
    return (
      <h1>Page Not Found!</h1>
    )
  }
}

export default App;
