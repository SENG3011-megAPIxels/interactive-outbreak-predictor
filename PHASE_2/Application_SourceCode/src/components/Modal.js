import React from 'react';
import { StoreContext } from '../Store';
import { LinkButton } from './LinkButton';
import { ModalContainer, ModalContent, ModalContent2, ModalImage, ModalButtons, LogoImage } from './StyledComponents';
import Logoimg from "../screens/logo.png";

function Modal () {
  const { page, modal, country, sliderVal, sliderNum } = React.useContext(StoreContext);
  const [covidData, setCovidData] = React.useState({});

  React.useEffect(async () => {
    const response = await fetch(`https://p5t20q9fz6.execute-api.ap-southeast-2.amazonaws.com/ProMedApi/futureglobalcovid`, {
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

  const getMonth = (value) => {
    switch(value) {
      case 1:
        return ('Jan 2020');
        break;
      case 2:
        return ('Feb 2020');
        break;
      case 3:
        return ('Mar 2020');
        break;
      case 4:
        return ('Apr 2020');
        break;
      case 5:
        return ('May 2020');
        break;
      case 6:
        return ('Jun 2020');
        break;
      case 7:
        return ('Jul 2020');
        break;
      case 8:
        return ('Aug 2020');
        break;
      case 9:
        return ('Sep 2020');
        break;
      case 10:
        return ('Oct 2020');
        break;
      case 11:
        return ('Nov 2020');
        break;
      case 12:
        return ('Dec 2020');
        break;
      case 13:
        return ('Jan 2021');
        break;
      case 14:
        return ('Feb 2021');
        break;
      case 15:
        return ('Mar 2021');
        break;
      case 16:
        return ('Apr 2021');
        break;
      case 17:
        return ('May 2021');
        break;
      case 18:
        return ('Jun 2021');
        break;
      case 19:
        return ('Jul 2021');
        break;
      case 20:
        return ('Aug 2021');
        break;
      case 21:
        return ('Sep 2021');
        break;
      case 22:
        return ('Oct 2021');
        break;
      case 23:
        return ('Nov 2021');
        break;
      case 24:
        return ('Dec 2021');
        break;
      case 25:
        return ('Jan 2022');
        break;
      case 26:
        return ('Feb 2022');
        break;
      case 27:
        return ('Mar 2022');
        break;
      case 28:
        return ('Apr 2022');
        break;
      case 29:
        return ('May 2022');
        break;
      case 30:
        return ('Jun 2022');
        break;
      case 31:
        return ('Jul 2022');
        break;
      case 32:
        return ('Aug 2022');
        break;
      case 33:
        return ('Sep 2022');
        break;
      case 34:
        return ('Oct 2022');
        break;
      case 35:
        return ('Nov 2022');
        break;
      default:
        return ('Dec 2022');
        break;
    }
  }

  if (modal.modal === 2) {
    return (
      <ModalContainer>
        <ModalContent>
            <h2 style={{textAlign: 'center'}}>{country.country.NAME}</h2>
            <ModalImage src={`https://countryflagsapi.com/png/${country.country.ISO_A3}`} alt={`Flag of ${country.country.NAME}`}/>
            <h3>{getMonth(sliderNum.sliderNum)}</h3>
            <div>
              <p>{'New Cases: ' + (covidData[country.country.ISO_A3] !== undefined ? covidData[country.country.ISO_A3][sliderVal.sliderVal].newCases : 'Unknown')}</p>
              <p>{'New Deaths: ' + (covidData[country.country.ISO_A3] !== undefined ? covidData[country.country.ISO_A3][sliderVal.sliderVal].newDeaths : 'Unknown')}</p>
              <p>{'Total Vaccinated: ' + (covidData[country.country.ISO_A3] !== undefined ? covidData[country.country.ISO_A3][sliderVal.sliderVal].totalVaccinated : 'Unknown')}</p>
              <p>{'Percentage Vaccinated: ' + (covidData[country.country.ISO_A3] !== undefined ? covidData[country.country.ISO_A3][sliderVal.sliderVal].percVaccinated : 'N/A')}</p>
            </div>
            <LinkButton to={`/country/${country.country.NAME}`} onClick={() => {modal.setModal(0); page.setPage(1)}} value="See Predictions"/>
            <LinkButton to={'./map'} onClick={() => modal.setModal(1)} value="Back"/>
        </ModalContent>
      </ModalContainer>
    );
  } else if (modal.modal === 1) {
    return (
      <ModalContainer>
        <ModalContent2>
          <LogoImage src={Logoimg}/>
          <p>Welcome to Interactive Outbreak Predictor!</p>
          <p>Select a country to begin!</p>
          <ModalButtons>
            <LinkButton to={'./'} onClick={() => page.setPage(4)} value="Home"/>
            <LinkButton to={'./help'} onClick={() => page.setPage(2)} value="Help"/>
            <LinkButton to={'./preferences'} onClick={() => page.setPage(3)} value="Preferences"/>
          </ModalButtons>
        </ModalContent2>
      </ModalContainer>
    );
  } else {
    return null;
  }
}

export default Modal;
