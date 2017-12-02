import React, { Component } from 'react';
import { signOut } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SignOutLink extends Component {

  signOut = () => {
    this.props.signOut()
  }

  render() {
    return (
      <div>
        <a href="/" onClick={this.signOut}>Sign out</a>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: bindActionCreators(signOut, dispatch),
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignOutLink);
