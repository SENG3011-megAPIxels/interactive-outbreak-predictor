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

const MapMain = styled.div`
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
  justify-content: space-evenly;
`

const MapContainer = styled.div`
  width: 70vw;
  margin-left: 7vw;
`

const OuterMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledSlider = styled(Slider)`
  flex: 1;
  margin-top: -100px;
  margin-left: 40px;
  bottom: -50px !important;
  width: 94vw !important;
  color: black !important;
`

const StyledSliderDark = styled(Slider)`
  flex: 1;
  margin-top: -100px;
  margin-left: 40px;
  bottom: -50px !important;
  width: 94vw !important;
  color: white !important;
`

const ModalContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 20vw;
  max-width: 20vw;
  position: relative;
  right: 20vw;
  bottom: -8vh;
  pointer-events: none;
  min-height: 50vh;
  max-height: 50vh;
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
  min-height: 550px;
  justify-content: space-around;
`

const ModalContent2 = styled.div`
  background-color: lightsteelblue;
  width: 150%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  margin-top: 100px;
  padding: 10px;
  text-align: center;
  pointer-events: all;
  min-height: 500px;
  justify-content: space-around;
`

const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
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
  object-fit: contain;
  margin-left: 77vw;
  flex-direction: column;
  border-style: solid;
  border-width: medium;
  border-color: rgb(176,196,222);
  border-radius: 10px;
  padding: 10px;
  background-color: rgb(176,196,222);
`

const GraphSingleOption = styled.div`
  display: flex;
  align-items: center;
`

const ModalImage = styled.img`
  width: 75px;
  height: 60px;
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
  justify-content: left;
`

const LandingImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 60vh;
  min-height: 60vh;
  max-width: 100vw;
  min-width: 100vw;
  overflow: hidden;
`

const LandingImage = styled.img`
  max-width: 50%;
  min-width: 50%;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  transition: transform .5s ease;
  &:hover {
    filter: none;
    -webkit-filter: grayscale(0);
    transform: scale(1.05);
  }
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
         MapMain,
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
         LandingMain,
         LandingImage,
         LandingImageContainer,
         OuterMapContainer,
         ModalContent2,
         ModalButtons
       }
