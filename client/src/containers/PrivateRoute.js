import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      props.isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to='/signin' />
    )} />
  )

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn
  };
}

export default connect(mapStateToProps)(PrivateRoute);
