import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavItem, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {

  constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

  render() {
    return (
      <Navbar color='light' light expand="md" className="sticky-top">
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav>
        <li>
          <NavLink to='/' style={{ textDecoration: 'none' }}>&nbsp; Home &nbsp;</NavLink>
        </li>
        <NavItem>
          <NavLink to='/news' style={{ textDecoration: 'none' }}>&nbsp; News Feed &nbsp;</NavLink>
        </NavItem>

        {!this.props.isLoggedIn ? (
          <Nav>
            <NavItem>
              <NavLink to='/signin' style={{ textDecoration: 'none' }}>&nbsp; Login &nbsp;</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signup' style={{ textDecoration: 'none' }}>&nbsp; Sign Up &nbsp;</NavLink>
            </NavItem>
          </Nav>
          ) : (
          <Nav>
            <NavItem>
              <NavLink to='/notes' style={{ textDecoration: 'none' }}>&nbsp; Saved Stories &nbsp;</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signout' style={{ textDecoration: 'none' }}>&nbsp; Sign Out &nbsp;</NavLink>
            </NavItem>
          </Nav>
          )}

        </Nav>
      </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.userReducer.isLoggedIn }
}

export default connect(mapStateToProps)(Navigation);
