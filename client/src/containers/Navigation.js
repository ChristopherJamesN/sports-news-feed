import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';

class Navigation extends Component {

  render() {
    return (
      <Navbar className='sticky-top d-flex flex-row' color='faded' light>
        <Nav className='d-inline-flex flex-row' navbar>
        <NavItem className='mr-5 mt-2'>
          <NavLink className='d-inline align-bottom' href='/'>Home</NavLink>
        </NavItem>
        <NavItem className='mr-5 mt-2'>
          <NavLink className='d-inline align-bottom' href='/news'>News Feed</NavLink>
        </NavItem>
          {this.props.isLoggedIn ? (
            <div>
              <NavItem className='ml-1 mr-3 mt-2'>
                <NavLink className='d-inline text-bottom' href='/signin'>Login</NavLink>
              </NavItem>
              <NavItem className='ml-1 mr-3 mt-2'>
                <NavLink className='d-inline text-bottom' href='/signup'>Sign Up</NavLink>
              </NavItem>
            </div>
             ) : (
               <div>
                 <NavItem className='ml-1 mr-3 mt-2'>
                   <NavLink className='d-inline text-bottom' href='/notes'>Saved Stories</NavLink>
                 </NavItem>
                 <NavItem className='ml-1 mr-3 mt-2'>
                   <NavLink className='d-inline text-bottom' href='/signout'>Sign Out</NavLink>
                 </NavItem>
               </div>
             )}
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.userReducer.isLoggedIn }
}

export default connect(mapStateToProps)(Navigation);
