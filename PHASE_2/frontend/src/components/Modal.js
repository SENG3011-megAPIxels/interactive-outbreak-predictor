import React from 'react';
import { StoreContext } from '../Store';
import { LinkButton } from './LinkButton';
import { ModalContainer, ModalContent } from './StyledComponents'

function Modal () {
  const { page, modal, country } = React.useContext(StoreContext);

  if (modal.modal === 2) {
    return (
      <ModalContainer>
        <ModalContent>
            <h2 className="modal-title">{country.country}</h2>
            Stat Summary Here
            <LinkButton to={`/country/${country.country}`} onClick={() => {modal.setModal(0); page.setPage(1)}} value="See More"/>
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
        </ModalContent>
      </ModalContainer>
    );
  } else {
    return null;
  }
}

export default Modal;
