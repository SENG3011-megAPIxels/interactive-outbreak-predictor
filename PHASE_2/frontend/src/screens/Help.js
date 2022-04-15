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

function Help () {
    const { page } = React.useContext(StoreContext);
  return (
    <Container>
      <Header>
        <LogoImage src={Logoimg}/>
        Help
        <LinkButton to={'.'} onClick={() => page.setPage(0)} value="Back"/>
      </Header>
      <Typography>
        <br></br>
        <br></br>
        <HelpHeading>
          Contents
          <HelpBody>
            1. About IOP <br></br>
            2. How to use the API <br></br>
            <HelpBody>
              2.1 The Home Page <br></br>
              2.2 The Preferences Page <br></br>
              <HelpBody>
                2.1.1 Using the Slider <br></br>
                2.1.2 Interacting with the Heat Map <br></br>
                2.1.3 Interacting with the Modal <br></br>
                2.1.4 Using the Dropdown <br></br>
              </HelpBody>
              2.3 The Predictions Page <br></br>
            </HelpBody>
            3. Contact the developers<br></br> 
            4. Disclaimer<br></br>
          </HelpBody>
        </HelpHeading>
        <HelpHeading>
        <br></br>
          <br></br>
          1. About IOP
        </HelpHeading>
        <HelpBody>
        IOP is an interactive web-based API that is designed to provide historical statistical information about diseases in each country including COVID-19, as well as providing insight into the possibility of potential future outbreaks. The API also provides information about past and predicted future data on stocks, petrol prices, jobs market and much more to be added later.
        </HelpBody>
        <HelpBody>
        The API is a team project developed in 2022 by 5 students from the University of New South Wales (UNSW) Sydney Australia. As it is still a work in progress, many features have not yet been implemented and more UI improvements are expected to take place over time. On that note, if the user suspects there is an error or bug in the application, or would like to make any suggestions for improvements or submit a general inquiry, please see the 'Contact the developers' section.
        </HelpBody>
        <HelpHeading>
          <br></br>
          <br></br>
          2. How to use the API
        </HelpHeading> 
        <HelpSubHeading>
          <br></br>
          2.1. The Home page
        </HelpSubHeading> 
        <HelpBody>
        The Homepage is composted of 4 main sections: 
        <HelpBody>• Heat map (🅐)<br></br>•	Side modal (🅑)<br></br>•	Slider (🅒)<br></br>•	Disease dropdown (🅓)<br></br>
          </HelpBody>
          <br></br>
          <HelpImg1 src={ABCD}/>
          <br></br><br></br>
        2.1.1. The slider lets you change the time of the disease heat map in monthly increments starting from December 2019.
        As you slide through the timeline, it will give an overview of the relative number of cases in each country for that month/year.
        The countries will be colour-coded to show the amount of new cases per country.
        Countries with fewer cases will be lighter in colour, whereas countries with more cases will be darker.
        <br></br>
        <br></br>
        <HelpGif1 src={Gif1}/>
        <br></br>
        <br></br>
        2.1.2. At any given month and year, you can hover over any country to quickly reveal the exact number of cases for the selected time.
        <br></br>
        <br></br>
        <HelpGif2 src={Gif2}/>
        <br></br>
        <br></br>
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
        2.1.4. In the top right-hand corner of the home page, you can select the type of information you wish to dispay using the drop-down menu.
        Click on the dropdown button to show the options available to display, then click an option you would like the application to display.
        For example, if you wish to learn about COVID-19 case data, click on the drop-down button, then click 'COVID-19'
        <br></br>
        <br></br>
          </HelpBody>
        <HelpSubHeading>
        2.2. The Preferences Page
          </HelpSubHeading>  
        <HelpBody>
          Add info here
          <br></br>
          <br></br>
          </HelpBody>
        <HelpSubHeading>
        2.3. The Predictions Page
          </HelpSubHeading>
        <HelpBody>
        Add info here
        </HelpBody>
        <HelpHeading>
        3. Contact the developers
        </HelpHeading>
        <HelpHeading>
        4. Disclaimer
        </HelpHeading>
        
      </Typography>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}


export default Help;
