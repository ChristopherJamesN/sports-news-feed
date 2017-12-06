import React from 'react';
import { Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from '../components/Footer';
import IntroText from '../components/IntroText'

const Homepage = (props) => {
    return(
      <Container className='w-100 display-height p-0'>
        <Navigation />
        <IntroText />
        <Footer />
      </Container>
    )
  }


export default Homepage;
