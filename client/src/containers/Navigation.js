import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="light" light expand="md" className="sticky-top">
        <NavbarToggler onClick={this.toggle} />
        <NavbarBrand href="/">Home</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <br></br>
            <NavItem>
              <NavLink
                to="/news"
                style={{ textDecoration: 'none' }}
                onClick={this.toggle}
              >
                &nbsp; News Feed &nbsp;
              </NavLink>
            </NavItem>
            <br></br>

            {!this.props.isLoggedIn ? (
              <Nav navbar>
                <NavItem>
                  <NavLink
                    to="/signin"
                    style={{ textDecoration: 'none' }}
                    onClick={this.toggle}
                  >
                    &nbsp; Login &nbsp;
                  </NavLink>
                </NavItem>
                <br></br>
                <NavItem>
                  <NavLink
                    to="/signup"
                    style={{ textDecoration: 'none' }}
                    onClick={this.toggle}
                  >
                    &nbsp; Sign Up &nbsp;
                  </NavLink>
                </NavItem>
                <br></br>
              </Nav>
            ) : (
              <Nav navbar>
                <NavItem>
                  <NavLink
                    to="/notes"
                    style={{ textDecoration: 'none' }}
                    onClick={this.toggle}
                  >
                    &nbsp; Saved Stories &nbsp;
                  </NavLink>
                </NavItem>
                <br></br>
                <NavItem>
                  <NavLink
                    to="/signout"
                    style={{ textDecoration: 'none' }}
                    onClick={this.toggle}
                  >
                    &nbsp; Sign Out &nbsp;
                  </NavLink>
                </NavItem>
                <br></br>
              </Nav>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoggedIn: state.userReducer.isLoggedIn };
};

export default connect(mapStateToProps)(Navigation);
