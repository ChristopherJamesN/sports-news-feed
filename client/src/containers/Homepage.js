import React from 'react';
import { Container } from 'reactstrap';
import Navigation from './Navigation';
import Footer from '../components/Footer';
import IntroText from '../components/IntroText'
import NewsList from '../components/NewsList';
import NotesList from '../components/NotesList';


const Homepage = (props) => {
    return(
      <Container className='w-100 display-height p-0'>
        <Navigation />
        <Footer />
      </Container>
    )
  }


export default Homepage;
