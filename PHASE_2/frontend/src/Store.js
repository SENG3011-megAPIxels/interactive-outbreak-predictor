import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

Store.propTypes = {
  children: PropTypes.object.isRequired,
};

function Store ({ children }) {
  const [sliderVal, setSliderVal] = React.useState(2017);

  const store = {
    // The slider value
    sliderVal: { sliderVal, setSliderVal },
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default Store;
