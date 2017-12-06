import React from 'react';
import { Container } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Navigation from './Navigation';
import NotesPage from './NotesPage';
import NewsPage from './NewsPage';
import SignOutLink from '../components/auth/SignOutLink'
import SignInForm from '../components/auth/SignInForm'
import SignUpForm from '../components/auth/SignUpForm'
import { Grid, Jumbotron } from 'react-bootstrap';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const Homepage = (props) => {
    return(
      <Container className='w-100 display-height p-0'>
        <Navigation />
        <div>
          <h2>Welcome to the Sports News Feed App</h2>
          <p>This app pulls NBA, NFL, and other sports news, from ESPN, Fox Sports, and NFL News via NewsAPI. You can read a short description, favorite, and take notes on stories. Links to the stories open in a new tab. Sign in or sign up to favorite and take notes on stories.</p>
          <h3><NavLink to="/news">News Feed</NavLink></h3>
        </div>
      </Container>
    )
  }


export default Homepage;
