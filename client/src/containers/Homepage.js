import React from 'react';
import { Container } from 'reactstrap';
import IntroText from '../components/IntroText'

const Homepage = (props) => {
    return(
      <Container className='w-100 display-height p-0'>
        <IntroText />
      </Container>
    )
  }


export default Homepage;
