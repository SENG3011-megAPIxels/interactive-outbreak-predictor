import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

Store.propTypes = {
  children: PropTypes.object.isRequired,
};

function Store ({ children }) {
  const [page, setPage] = React.useState(4);
  const [modal, setModal] = React.useState(1);
  const [country, setCountry] = React.useState('');
  const [sliderVal, setSliderVal] = React.useState('03-22');
  const [sliderNum, setSliderNum] = React.useState(27);
  const [disease, setDisease] = React.useState("Covid-19");
  const [graph, setGraph] = React.useState("Disease");
  const [graphChoice, setGraphChoice] = React.useState('Cases');
  const [dark, setDark] = React.useState(false);

  const store = {
    // The page number
    page: { page, setPage },
    // The modal is hidden or shown
    modal: { modal, setModal },
    // The country being displayed
    country: { country, setCountry },
    // The slider value
    sliderVal: { sliderVal, setSliderVal },
    // The slider number
    sliderNum: { sliderNum, setSliderNum },
    // The disease being displayed
    disease: { disease, setDisease },
    // The graph being displayed
    graph: { graph, setGraph },
    // The different version of each graph
    graphChoice: { graphChoice, setGraphChoice },
    // Is dark mode enabled
    dark: { dark, setDark }
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default Store;
