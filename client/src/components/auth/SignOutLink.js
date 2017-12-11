import React, { Component } from 'react';
import { signOut } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

class SignOutLink extends Component {

  signOut = () => {
    this.props.signOut()
  }

  render() {
    return (
      <div>
        <Button href="/" color="primary" onClick={this.signOut}>Sign out</Button>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: bindActionCreators(signOut, dispatch),
   }
};

export default connect(null, mapDispatchToProps)(SignOutLink);
