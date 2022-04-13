import React from "react";
import { StoreContext } from '../Store';
import { Container, Header, Footer, PreferencesMain, StyledForm, GraphSingleOption, StyledInput, StyledSelectInput } from '../components/StyledComponents'
import { LinkButton, LinkButton2 } from "../components/LinkButton";
import DropDown from "../components/DropDown";
import Logoimg from "./logo.png"

function Preferences () {
  const { page } = React.useContext(StoreContext);

  const [email, setEmail] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [disease, setDisease] = React.useState('Covid-19');

  function sendEmail () {
    if (email === '') {
      alert('No email entered!');
    } else if (firstName === '') {
      alert('No first name entered!');
    } else if (lastName === '') {
      alert('No last name entered!');
    } else if (country === '') {
      alert('No country entered!');
    } else {
      alert(`Thank you ${firstName}.\nConfirmation email sent to ${email}\nYou will be notified about ${disease} in ${country}.`)
    }
  }

  return (
    <Container>
      <Header>
        <img src={Logoimg} height={"80px"} width={"180px"} alignItems={'left'} justifyContent={'left'} />
        <text>Preferences</text>
        <LinkButton2 to={'.'} onClick={() => page.setPage(0)} value="Back"/>
      </Header>
      <PreferencesMain>
        <StyledForm>
          <GraphSingleOption>
            <input type="radio" id="lightMode" name="mode" value="light" defaultChecked/>
            <label htmlFor="lightMode"> Light Mode </label>
          </GraphSingleOption>
          <GraphSingleOption>
            <input type="radio" id="darkMode" name="mode" value="dark"/>
            <label htmlFor="darkMode"> Dark Mode </label>
          </GraphSingleOption>
        </StyledForm>
        <StyledForm>
          <h2>Subscribe to Alerts!</h2>
          <label htmlFor="firstName"> First Name </label>
          <StyledInput id="firstName" type="text" onChange={({ target }) => setFirstName(target.value)} placeholder="John"/>
          <label htmlFor="lastName"> Last Name </label>
          <StyledInput id="lastName" type="text" onChange={({ target }) => setLastName(target.value)} placeholder="Smith"/>
          <label htmlFor="email"> Email Address </label>
          <StyledInput id="email" type="email" onChange={({ target }) => setEmail(target.value)} placeholder="example@email.com"/>
          <label htmlFor="country"> Country </label>
          <StyledInput id="country" type="text" onChange={({ target }) => setCountry(target.value)} placeholder="Australia"/>
          <label htmlFor="disease"> Disease </label>
          <StyledSelectInput>
            <option id="disease" value="Covid-19">Covid-19</option>
            <option id="disease" value="Coming Soon">Coming Soon</option>
          </StyledSelectInput>
          <LinkButton to={'./preferences'} onClick={() => sendEmail()} value="Submit"/>
        </StyledForm>
      </PreferencesMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}


export default Preferences;
