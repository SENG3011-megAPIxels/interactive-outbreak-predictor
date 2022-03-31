import React from 'react';
import { StoreContext } from '../Store';
import styled from 'styled-components';
import { LinkButton } from './LinkButton';

const ModalContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  min-width: 200px;
  min-height: 200px;
  position: relative;
  right: 100px;

`

const ModalContent = styled.div`
  background-color: #aaa;
  width: 150%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin-top: 100px;
  padding: 5px;
  text-align: center;
`

function Modal () {
  const { page, modal, country } = React.useContext(StoreContext);

  if (modal.modal === 2) {
    return (
      <ModalContainer>
        <ModalContent>
            <h2 className="modal-title">{country.country}</h2>
            <LinkButton to={`/country/${country.country}`} onClick={() => {modal.setModal(0); page.setPage(1)}} value="See More"/>
            <LinkButton to={'.'} onClick={() => modal.setModal(1)} value="Back"/>
        </ModalContent>
      </ModalContainer>
    );
  } else if (modal.modal === 1){
    return (
      <ModalContainer>
        <ModalContent>
            Select a Country to Learn More
        </ModalContent>
      </ModalContainer>
    );
  } else {
    return null;
  }
}

export default Modal;
