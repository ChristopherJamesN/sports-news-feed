import React from 'react';
import NavBarSignedIn from './NavBarSignedIn';
import NavBarSignedOut from './NavBarSignedOut';

const NavBar = ({ loggedIn }) => {
  return ( loggedIn? (<NavBarSignedIn />) : (<NavBarSignedOut />))
}

export default NavBar;
