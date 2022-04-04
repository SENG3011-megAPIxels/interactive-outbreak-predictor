import styled from 'styled-components';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';

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
  font-size: 2em;
  color: white;
`

const Footer = styled.div`
  flex: 1;
  display: flex;
  background: red;
  align-items: center;
  justify-content: center;
  color: white;
  bottom: 0;
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
  padding: 20px;
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
  margin-left: 40px;
  bottom: -50px !important;
  width: 70vw !important;
  color: black !important;
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
  pointer-events: none;
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
  pointer-events: all;
`
const GridContainer = styled.div`
  display: flex;
  padding: 20px;
  border-style: dotted;
  height: 100%;
  width: 90%;
  overflow: hidden;
`
const GridElement = styled.div`
  border-style: solid;
  border-width: medium;
  border-color: red;
  border-radius: 10px;
  display: flex;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
  text-align: center;
  padding: 2px;
  height: 95%;
  width: 95%;
`

const StyledSelect = styled(Select)`
  color: white !important;
`

export { Container,
         Header,
         Footer,
         Main,
         CountryMain,
         MapContainer,
         StyledSlider,
         ModalContainer,
         ModalContent,
         GridContainer,
         GridElement,
         StyledSelect
       }
