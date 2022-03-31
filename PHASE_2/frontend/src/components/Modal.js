import React from 'react';
import { StoreContext } from '../Store';
import styled from 'styled-components';
import { LinkButton } from './LinkButton';

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const ModalContent = styled.div`
  width: 70vw;
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin-top: 100px;
`

function Modal () {
  const { page, modal, country } = React.useContext(StoreContext);

  if (modal.modal) {
    return (
      <ModalContainer>
        <ModalContent>
            <h2 className="modal-title">{country.country} Modal</h2>
            <LinkButton to={`/country/${country.country}`} onClick={() => {modal.setModal(false); page.setPage(1)}} value="See More"/>
            <LinkButton to={'.'} onClick={() => modal.setModal(false)} value="Back"/>
        </ModalContent>
      </ModalContainer>
    );
  } else {
    return null;
  }
}

export default Modal;
