import React from 'react';
import { StoreContext } from '../Store';
import { LinkButton } from './LinkButton';
import { ModalContainer, ModalContent, ModalImage } from './StyledComponents'

function Modal () {
  const { page, modal, country, sliderVal } = React.useContext(StoreContext);
  const [covidData, setCovidData] = React.useState({});

  React.useEffect(async () => {
    const response = await fetch(`https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/globalcovid`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    const json = await response.json();
    if (response.ok) {
      //console.log(JSON.parse(json.body).CHN);
      setCovidData(JSON.parse(json.body));
    } else {
      console.log('error');
    }
  }, [])

  if (modal.modal === 2) {
    return (
      <ModalContainer>
        <ModalContent>
            <h2 className="modal-title">{country.country.NAME}</h2>
            <ModalImage src={`https://countryflagsapi.com/png/${country.country.ISO_A3}`} alt={`Flag of ${country.country.NAME}`}/>
            <p>{'New Cases: ' + (covidData[country.country.ISO_A3] !== undefined ? covidData[country.country.ISO_A3][sliderVal.sliderVal].newCases : 'Unknown')}</p>
            <p>{'New Deaths: ' + (covidData[country.country.ISO_A3] !== undefined ? covidData[country.country.ISO_A3][sliderVal.sliderVal].newDeaths : 'Unknown')}</p>
            <p>{'Total Vaccinated: ' + (covidData[country.country.ISO_A3] !== undefined ? covidData[country.country.ISO_A3][sliderVal.sliderVal].totalVaccinated : 'Unknown')}</p>
            <p>{'Percentage Vaccinated: ' + (covidData[country.country.ISO_A3] !== undefined ? covidData[country.country.ISO_A3][sliderVal.sliderVal].percVaccinated : 'N/A')}</p>
            <LinkButton to={`/country/${country.country.NAME}`} onClick={() => {modal.setModal(0); page.setPage(1)}} value="See More"/>
            <LinkButton to={'.'} onClick={() => modal.setModal(1)} value="Back"/>
        </ModalContent>
      </ModalContainer>
    );
  } else if (modal.modal === 1){
    return (
      <ModalContainer>
        <ModalContent>
          <p>Welcome to Interactive Outbreak Predictor!</p>
          <p>Please select a country to learn more</p>
          <LinkButton to={'./help'} onClick={() => page.setPage(2)} value="Help"/>
          <LinkButton to={'./preferences'} onClick={() => page.setPage(3)} value="Preferences"/>
        </ModalContent>
      </ModalContainer>
    );
  } else {
    return null;
  }
}

export default Modal;
