import React, { Component } from 'react';
import { signUp } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
    };
  }

  handleInputChange = (event) => {
    // Get a deep clone of the component's state before the input change.
    var nextState = _.cloneDeep(this.state);

    //Update the state of the component
    nextState[event.target.name] = event.target.value;

    // Update the component's state with the new state
    this.setState(nextState);
  }

  handleRegistrationClick = () => {
    this.props.signUp();
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <input type='email'
              name='email'
              placeholder='Email'
              className="form-control"
              value={this.state.email}
              onChange={this.handleInputChange} />
           </div>

           <div className="form-group">
            <input type='password'
              name='password'
              placeholder='Password'
              className="form-control"
              value={this.state.password}
              onChange={this.handleInputChange} />
            </div>

          <div className="form-group">
            <input type='password'
              name='password_confirmation'
              placeholder='Confirm password'
              className="form-control"
              value={this.state.password_confirmation}
              onChange={this.handleInputChange} />
           </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleRegistrationClick}
            >
            Sign Up
          </button>
        </form>
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
    signUp: bindActionCreators(signUp, dispatch),
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
