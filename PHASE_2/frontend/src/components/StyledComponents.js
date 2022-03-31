import styled from 'styled-components';
import Slider from '@mui/material/Slider';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Header = styled.div`
  flex: 1;
  display: flex;
  background: red;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 2em;
`

const Footer = styled.div`
  flex: 1;
  display: flex;
  background: red;
  align-items: center;
  justify-content: center;
`

const Main = styled.div`
  flex: 15;
  display: flex;
`

const CountryMain = styled.div`
  flex: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MapContainer = styled.div`
  flex: 10;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const StyledSlider = styled(Slider)`
  flex: 1;
  margin-top: -100px;
  bottom: -80px !important;
  width: 75vw !important;
`

const ModalContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  min-width: 200px;
  max-width: 200px;
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

export { Container,
         Header,
         Footer,
         Main,
         CountryMain,
         MapContainer,
         StyledSlider,
         ModalContainer,
         ModalContent
       }
