import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../actions'

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this)

    this.state = {
      dropdownOpen: false
    };
  }

  logout = (event) => {
    event.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.props.logout();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <ButtonDropdown isOpen={ this.state.dropdownOpen } toggle={ this.toggle }>
        <DropdownToggle nav>
          {(this.props.email) ? this.props.email : (undefined) }
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem><Link to='/news'>News Feed</Link></DropdownItem>
          <DropdownItem>Saved Stories</DropdownItem>
          <DropdownItem>Account</DropdownItem>
          <DropdownItem onClick={this.logout}>Logout</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

const mapStateToProps = (state) => {
  return { email: state.userReducer.email };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signOut }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
