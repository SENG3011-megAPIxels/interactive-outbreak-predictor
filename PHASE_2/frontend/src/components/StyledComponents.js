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
  background: #37568d;
  align-items: center;
  justify-content: space-between;
  font-size: 2em;
  color: white;
`

const Footer = styled.div`
  flex: 1;
  display: flex;
  background: #37568d;
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
  justify-content: space-around;
`

const CountryMain = styled.div`
  flex: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const LandingMain = styled.div`
  flex: 15;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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

const StyledSliderDark = styled(Slider)`
  flex: 1;
  margin-top: -100px;
  margin-left: 40px;
  bottom: -50px !important;
  width: 70vw !important;
  color: white !important;
`

const ModalContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  min-width: 300px;
  max-width: 300px;
  min-height: 200px;
  position: relative;
  right: 17px;
  pointer-events: none;
`

const ModalContent = styled.div`
  background-color: lightsteelblue;
  width: 150%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin-top: 100px;
  padding: 5px;
  text-align: left;
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
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const StyledInput = styled.input`
  height: 30px;
  font-size: 12pt;
  border-radius: 10px;
  border: 1px solid black;
  width: 200px;
  margin: 10px;
`

const StyledSelectInput = styled.select`
  height: 30px;
  font-size: 12pt;
  border-radius: 10px;
  border: 1px solid black;
  width: 200px;
  margin: 10px;
`

const LogoImage = styled.img`
  height: 80px;
  width: 180px;
  align-items: left;
  justifyContent: left;
`
const HelpHeading = styled.div`
  font-size: 25pt;
  justifyContent: left;
  margin-left: 70px;
  margin-right: 70px;
`
const HelpSubHeading = styled.div`
  font-size: 20pt;
  justifyContent: left;
  margin-left: 70px;
  margin-right: 70px;
`
const HelpBody = styled.div`
  font-size: 15pt;
  justifyContent: left;
  margin-left: 70px;
  margin-right: 70px;
`
const HelpImg1 = styled.img`
  height: 680px;
  width: 1200px;
  align-items: left;
  justifyContent: left;
`
const HelpGif1 = styled.img`
height: 670px;
width: 1200px;
align-items: left;
justifyContent: left;
`
const HelpGif2 = styled.img`
height: 670px;
width: 1200px;
align-items: left;
justifyContent: left;
`
const HelpGif3 = styled.img`
height: 670px;
width: 1200px;
align-items: left;
justifyContent: left;
`
export { Container,
         Header,
         Footer,
         Main,
         CountryMain,
         MapContainer,
         StyledSlider,
         StyledSliderDark,
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
         PreferencesMain,
         StyledInput,
         StyledSelectInput,
         LogoImage,
         HelpHeading,
         HelpSubHeading,
         HelpBody,
         HelpImg1,
         HelpGif1,
         HelpGif2,
         HelpGif3,
         LandingMain
       }
