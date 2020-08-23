import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import IntroText from '../components/IntroText';

class Homepage extends Component {
  render() {
    return (
      <div>
        <Alert color="info" isOpen={this.props.isLoggedIn}>
          You are logged in.
        </Alert>
        <Alert color="info" isOpen={!this.props.isLoggedIn}>
          You are logged out.
        </Alert>
        <IntroText />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Homepage);
