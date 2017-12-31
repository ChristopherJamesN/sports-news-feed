import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavItem, NavbarToggler, NavbarBrand } from 'reactstrap';
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
      <NavbarBrand href="/">Home</NavbarBrand>
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink to='/news' style={{ textDecoration: 'none' }} onClick={this.toggle}>&nbsp; News Feed &nbsp;</NavLink>
        </NavItem>

        {!this.props.isLoggedIn ? (
          <Nav navbar>
            <NavItem>
              <NavLink to='/signin' style={{ textDecoration: 'none' }} onClick={this.toggle}>&nbsp; Login &nbsp;</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signup' style={{ textDecoration: 'none' }} onClick={this.toggle}>&nbsp; Sign Up &nbsp;</NavLink>
            </NavItem>
          </Nav>
          ) : (
          <Nav navbar>
            <NavItem>
              <NavLink to='/notes' style={{ textDecoration: 'none' }} onClick={this.toggle}>&nbsp; Saved Stories &nbsp;</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/signout' style={{ textDecoration: 'none' }} onClick={this.toggle}>&nbsp; Sign Out &nbsp;</NavLink>
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
