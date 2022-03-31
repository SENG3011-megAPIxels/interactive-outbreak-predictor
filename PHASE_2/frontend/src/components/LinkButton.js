import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StyledLink = styled(Link)`
  @media (max-width: 768px) {
    width: 19vw;
    font-size: 10pt;
  }
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 10px;
  border: none;
  font-size: 12pt;
  text-decoration: none;
  margin: 10px;
  cursor: pointer;
  width: 120px;
  text-align: center;
  border: 1px solid blue;

  &:hover {
    background-color: white;
    color: blue;
  }
`
/*
Component used for 'link' buttons which lead to different screens
*/
function LinkButton ({ id, to, onClick, value }) {
  return (
    <Router>
      <StyledLink id={id} to={to} onClick={onClick}>
        {value}
      </StyledLink>
    </Router>
  )
}

LinkButton.propTypes = {
  id: PropTypes.string,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export { LinkButton, StyledLink };
