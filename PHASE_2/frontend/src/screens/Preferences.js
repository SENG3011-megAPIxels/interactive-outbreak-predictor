import React from "react";
import { StoreContext } from '../Store';
import { Container, Header, Footer, PreferencesMain, StyledForm, GraphSingleOption } from '../components/StyledComponents'
import { LinkButton, LinkButton2 } from "../components/LinkButton";
import DropDown from "../components/DropDown";

function Preferences () {
    const { page } = React.useContext(StoreContext);
  return (
    <Container>
      <Header>
        <text>Preferences</text>
        <LinkButton2 to={'.'} onClick={() => page.setPage(0)} value="Back"/>
      </Header>
      <PreferencesMain>
        <GraphSingleOption>
          <input type="radio" id="lightMode" name="mode" value="light" defaultChecked/>
          <label htmlFor="lightMode"> Light Mode </label>
        </GraphSingleOption>
        <GraphSingleOption>
          <input type="radio" id="darkMode" name="mode" value="dark"/>
          <label htmlFor="darkMode"> Dark Mode </label>
        </GraphSingleOption>
        <br/>
        <div>
          <h2>Subscribe to Alerts!</h2>
          <StyledForm>
            <br/>
            <p>First Name</p>
            <input type="text"/>
            <p>Last Name</p>
            <input type="text"/>
            <p>Email Address</p>
            <input type="email"/>
            <p>Country</p>
            <input type="text"/>
            <p>Disease</p>
            <select>
              <option value="Covid-19">Covid-19</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </StyledForm>
        </div>
      </PreferencesMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}


export default Preferences;
