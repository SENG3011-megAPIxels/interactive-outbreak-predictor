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
  justify-content: space-between;
  font-size: 2em;
  color: white;
  padding-left: 25vw;
  padding-right: 10px;
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

const PreferencesMain = styled.div`
  flex: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  min-width: 280px;
  max-width: 280px;
  min-height: 200px;
  position: relative;
  right: 17px;
  pointer-events: none;
`

const ModalContent = styled.div`
  background-color: #ffb3b3;
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

const ButtonRow = styled.div`
  display: inline-block;
  width: 85%;
`

const GraphOptionsMain = styled.div`
  display: flex;
  position: fixed;
  bottom: 75px;
  align-items: center;
  width: 80%;
  justify-content: space-around;
`

const GraphSingleOption = styled.div`
  display: flex;
  align-items: center;
`

const ModalImage = styled.img`
  width: 50px;
  height: 40px;
  object-fit:contain;
  margin-left:10px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
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
         StyledSelect,
         ButtonRow,
         GraphOptionsMain,
         GraphSingleOption,
         ModalImage,
         StyledForm,
         PreferencesMain
       }
