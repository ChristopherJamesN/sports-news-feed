import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import SignOutLink from '../components/auth/SignOutLink';

class Navigation extends Component {

  render() {
    return (
      <Navbar className='sticky-top d-flex flex-row' color='dark' light>
        <Nav>
        <NavItem>
          <NavLink href='/'>Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href='/news'>News Feed</NavLink>
        </NavItem>
        <UncontrolledDropdown nav innavbar="true">
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>

            {!this.props.isLoggedIn ? (
              <DropdownMenu >
                <DropdownItem>
                  <NavLink href='/signin'>Login</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href='/signup'>Sign Up</NavLink>
                </DropdownItem>
              </DropdownMenu> ) : (
                <DropdownMenu >
                  <DropdownItem>
                    <NavLink href='/notes'>Saved Stories</NavLink>
                  </DropdownItem>
                  <DropdownItem className="mx-auto">
                    <NavLink href='/signout'>Sign Out</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              )}

          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.userReducer.isLoggedIn }
}

export default connect(mapStateToProps)(Navigation);
