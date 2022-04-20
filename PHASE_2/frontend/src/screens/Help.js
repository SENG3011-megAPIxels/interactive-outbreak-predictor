import React from "react";
import { StoreContext } from '../Store';
import { Container, Header, Footer, LogoImage, HelpHeading, HelpBody, HelpSubHeading } from '../components/StyledComponents'
import { LinkButton } from "../components/LinkButton";
import Logoimg from "./logo.png";
import ABCD from "./ABCD.png"
import { Typography } from "@mui/material";
import { HelpImg1, HelpGif1, HelpGif2, HelpGif3 } from "../components/StyledComponents";
import Gif1 from "./Gif1.gif"
import Gif2 from "./Gif2.gif"
import Gif3 from "./Gif3.gif"
import { BrowserRouter } from "react-router-dom";
import { HashLink as Link} from "react-router-hash-link"
function Help () {
    const { page } = React.useContext(StoreContext);
  return (

    <Container>
      <Header>
        <LogoImage src={Logoimg}/>
        Help
        <LinkButton to={'./map'} onClick={() => page.setPage(0)} value="Back"/>
      </Header>
      <Typography>
      <BrowserRouter>
        <br></br>
        <br></br>
        <HelpHeading>
          Contents
          <HelpBody>
          {/*changed color to #888 to work with dark and light mode*/}
          1. <Link to = '#1' style = {{color: "#888"}} smooth>
          <u>About IOP</u><br></br>
            </Link>
            2. <Link  to = '#2' style = {{color: "#888"}} smooth>
            <u>How to use the API</u> <br></br>
            </Link>
            <HelpBody>
             2.1 <Link to = '#2.1' style = {{color: "#888"}} smooth>
             <u> The Home Page</u><br></br>
               </Link>
               <HelpBody>
                 2.1.1 <Link to = '#2.1.1' style = {{color: "#888"}} smooth>
                 <u> Using the Slider</u> <br></br>
                 </Link>
                 2.1.2 <Link to = '#2.1.2' style = {{color: "#888"}} smooth>
                 <u> Interacting with the Heat Map</u> <br></br>
                   </Link>
                 2.1.3 <Link to = '#2.1.3' style = {{color: "#888"}} smooth>
                 <u> Interacting with the Modal</u> <br></br>
                   </Link>
                 2.1.4 <Link to = '#2.1.4' style = {{color: "#888"}} smooth>
                 <u> Using the Dropdown</u> <br></br>
                   </Link>
               </HelpBody>
              2.2 <Link to = '#2.2' style = {{color: "#888"}} smooth>
              <u> The Preferences Page</u> <br></br>
              </Link>
              2.3 <Link to = '#2.3' style = {{color: "#888"}} smooth>
              <u>The Predictions Page</u> <br></br>
              </Link>

            </HelpBody>
            3. <Link to = '#3' style = {{color: "#888"}} smooth>
            <u>Contact the developers</u><br></br>
              </Link>
            4. <Link to = '#4' style = {{color: "#888"}} smooth>
            <u>Disclaimer</u><br></br>
              </Link>
          </HelpBody>
        </HelpHeading>
        <HelpHeading id = "1">
        <br></br>
          <br></br>
          1. About IOP
        </HelpHeading>
        <HelpBody>
        IOP is an interactive web-based API that is designed to provide historical statistical information about diseases in each country including COVID-19, as well as providing insight into the possibility of potential future outbreaks. The API also provides information about past and predicted future data on stocks, petrol prices, jobs market and much more to be added later.
        </HelpBody>
        <HelpBody>
        The API is a team project developed in 2022 by 5 students from the University of New South Wales (UNSW) Sydney Australia. As it is still a work in progress, many features have not yet been implemented and more UI improvements are expected to take place over time. On that note, if the user suspects there is an error or bug in the application, or would like to make any suggestions for improvements or submit a general inquiry,
        please see the <Link to = '#3' style = {{color: "#888"}} smooth>Contact the developers</Link> section.
        </HelpBody>
        <HelpHeading id ="2">
          <br></br>
          <br></br>
          2. How to use the API
        </HelpHeading>
        <HelpSubHeading id ="2.1">
          <br></br>
          2.1. The Home page
        </HelpSubHeading>
        <HelpBody>
        The Homepage is composted of 4 main sections:
        <HelpBody>• Heat map (🅐)<br></br>•	Side modal (🅑)<br></br>•	Slider (🅒)<br></br>•	Disease dropdown (🅓)<br></br>
          </HelpBody>
          <br></br>
          <HelpImg1 src={ABCD}/>
          </HelpBody>
          <HelpBody id = "2.1.1">
          <br></br>
        2.1.1. The slider lets you change the time of the disease heat map in monthly increments starting from December 2019.
        As you slide through the timeline, it will give an overview of the relative number of cases in each country for that month/year.
        The countries will be colour-coded to show the amount of new cases per country.
        Countries with fewer cases will be lighter in colour, whereas countries with more cases will be darker.
        <br></br>
        <br></br>
        <HelpGif1 src={Gif1}/>
        <br></br>
        <br></br>
        </HelpBody>
        <HelpBody id = "2.1.2">
        2.1.2. At any given month and year, you can hover over any country to quickly reveal the exact number of cases for the selected time.
        <br></br>
        <br></br>
        <HelpGif2 src={Gif2}/>
        <br></br>
        <br></br>
        </HelpBody>
        <HelpBody id = "2.1.3">
        2.1.3. Clicking on a country will expand the aformentioned information onto the modal located on the right-hand side of the screen.
        This section will display information such as new cases, new deaths, total number of people vaccinated and the percentage of the country's population vaccinated.
        <br></br>
        <br></br>
        <HelpGif3 src={Gif3}/>
        <br></br>
        <br></br>
        Here, you will be given the option to see the predictions page for the selected country. The predictions page will be covered in section bla.blah
        You can also select 'Back' to go back to the main screen, where you can access this 'Help' page and the 'Preferences' page.
        <br></br>
        <br></br>
        </HelpBody>
        <HelpBody id = "2.1.4">
        2.1.4. In the top right-hand corner of the home page, you can select the type of information you wish to dispay using the drop-down menu.
        Click on the dropdown button to show the options available to display, then click an option you would like the application to display.
        For example, if you wish to learn about COVID-19 case data, click on the drop-down button, then click 'COVID-19'
        <br></br>
        <br></br>
          </HelpBody>
        <HelpSubHeading id = "2.2">
        2.2. The Preferences Page
          </HelpSubHeading>
        <HelpBody>
        In the preferences page, you are able to customize the look of the API by selecting Light and Dark modes (Additional colour schemes coming soon).
        You are also able to subscribe to IOP using an email address to receive updates and alerts about the latest disease information in the selected country.
        You must provide a first name, last name, a valid email address, a country you would like to receive alerts about, and the disease.
          <br></br>
          <br></br>
          </HelpBody>
        <HelpSubHeading id = "2.3">
        2.3. The Predictions Page
          </HelpSubHeading>
        <HelpBody>
        Add info here
        </HelpBody>
        <HelpHeading id = "3">
        3. Contact the developers
        </HelpHeading>
        <br></br>
          <HelpBody>
            As this is still a work in progress, there may be visual bugs and inconsistensies as well as unimplemented features throughout the application.
            If you would like to report a bug, give us feedback, make a suggestion, comment or otherwise submit a general enquiry, please send an email to megapixelsseng3011@gmail.com and we will reply as soon as we can.
            Remember, any feedback will help us understand what users would like the API to improve in any way and is thus greatly appreciated.
          </HelpBody>
          <br></br>
        <HelpHeading id = "4">
        4. Disclaimer
        </HelpHeading>
        <br></br>
        <HelpBody>
          The disease reporting data provided by IOP is intended only to be a <strong>general guide</strong> for the user, or to gain insight into the potential future patterns of disease cases.
          It should <strong>not</strong> be used to aid in or carry out personal decisions as the data shown is not certain, nor 100% accurate.
          Actual real life data may be different and can be affected by unexpected events that cannot be detected by the application.
          <strong> Under no circumstances is IOP or its developers responsible for any kind personal loss as a result of the reliance of data given in the application.</strong>
        </HelpBody>
        <br></br>
        </BrowserRouter>
      </Typography>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>

  );
}


export default Help;
