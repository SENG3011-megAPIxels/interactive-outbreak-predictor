import React from "react";
import { StoreContext } from '../Store';
import { Container, Header, Footer, CountryMain, LogoImage } from '../components/StyledComponents'
import { LinkButton } from "../components/LinkButton";
import Logoimg from "./logo.png";

function Help () {
    const { page } = React.useContext(StoreContext);
  return (
    <Container>
      <Header>
        <LogoImage src={Logoimg}/>
        Help
        <LinkButton to={'.'} onClick={() => page.setPage(0)} value="Back"/>
      </Header>
      <CountryMain>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit libero sit amet viverra posuere. Pellentesque tempor id augue vel ultricies. Donec maximus in odio nec auctor. Nunc imperdiet gravida enim et fringilla. Aliquam blandit aliquam quam fringilla lacinia. Donec ac fringilla arcu. Etiam tempus turpis eu lorem maximus, cursus dapibus ex egestas. Nulla porttitor tempor imperdiet.

        Nam convallis, ligula vel lacinia semper, nisi ligula ultricies enim, ut rutrum dui dolor eu lacus. Ut id efficitur sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec id mauris vulputate velit molestie condimentum quis eget tortor. Vestibulum a commodo urna. Cras eget pulvinar lacus, molestie fringilla augue. Vivamus sapien lacus, maximus vel venenatis a, commodo vel justo.

        Quisque neque mi, faucibus ac semper id, fringilla eu orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla maximus nisi eget neque consectetur, blandit ullamcorper eros porta. Quisque vel leo sit amet erat mollis laoreet. Nulla gravida tortor vitae ex tempor finibus. Nunc nec fringilla neque. Etiam porta aliquam feugiat. Donec aliquam tempor pharetra.

        Sed scelerisque id lacus ac tincidunt. Sed non tempor nulla. Donec id ante nec ante vestibulum egestas. Quisque id mauris rutrum, hendrerit erat pharetra, semper dui. Proin at elit mi. Aliquam egestas velit sed velit laoreet, a efficitur diam venenatis. Donec eu ultricies enim. Ut commodo, lorem eget sodales iaculis, leo quam accumsan ex, hendrerit volutpat justo est non orci. Fusce ac rutrum neque. Phasellus hendrerit sagittis tortor, eget pharetra magna faucibus porta. In tellus metus, tempor id maximus non, efficitur non leo. Nam posuere sapien ac sodales scelerisque. Sed mollis accumsan ligula, sit amet dictum leo facilisis at. Cras velit elit, ultricies ut feugiat in, eleifend quis est. Nunc pretium erat sagittis lectus tristique, non molestie purus tincidunt.

        Maecenas ac consectetur velit. Etiam diam ipsum, sodales id ultrices id, vestibulum ac neque. Duis pellentesque velit ornare tellus suscipit auctor. Aenean quam mi, tincidunt eget feugiat eget, dignissim sit amet justo. Cras bibendum sem et ligula suscipit condimentum. Pellentesque vitae feugiat nibh. Integer pharetra nulla et diam iaculis malesuada. In lectus velit, eleifend quis elementum quis, sollicitudin non libero. Nam tempor risus in quam semper, fringilla faucibus sem vehicula. Nunc libero felis, varius quis nisl sit amet, consectetur convallis elit. Nam id odio pretium, eleifend augue a, aliquam dui. Curabitur mattis lorem ut leo venenatis facilisis. Pellentesque luctus lacus vitae lorem lacinia lacinia. Mauris rhoncus semper elit vel iaculis.</p>
      </CountryMain>
      <Footer>
        &copy; megAPIxels 2022
      </Footer>
    </Container>
  );
}


export default Help;
