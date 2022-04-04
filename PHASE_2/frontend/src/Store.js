import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

Store.propTypes = {
  children: PropTypes.object.isRequired,
};

function Store ({ children }) {
  const [page, setPage] = React.useState(0);
  const [modal, setModal] = React.useState(1);
  const [country, setCountry] = React.useState('');
  const [sliderVal, setSliderVal] = React.useState(2017);
  const [disease, setDisease] = React.useState("Covid-19");

  const store = {
    // The page number
    page: { page, setPage },
    // The modal is hidden or shown
    modal: { modal, setModal },
    // The country being displayed
    country: { country, setCountry },
    // The slider value
    sliderVal: { sliderVal, setSliderVal },
    // The disease being displayed
    disease: { disease, setDisease }
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default Store;
