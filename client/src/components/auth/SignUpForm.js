import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { signUp } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      loading: false
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleRegistrationClick = (event) => {

    if (this.state.password == '') {
      return 'Password must be valid.'
    }
    else if (this.state.email == '') {
      return 'Email must be valid.'
    }
    else if (this.state.password_confirmation == '') {
      return 'Password confirmation must be filled in.'
    }
    else {
      this.setState({
        loading: true
      });
      const data = `{"user":{"email":"${this.state.email}","password":"${this.state.password}","password_confirmation":"${this.state.password_confirmation}"}}`
      event.preventDefault();
      this.props.signUp(data, this.props.history);
    }
  }

  render() {
    return (
      <div>
        <Form>
          <div className="form-group">
            <Input type='email'
              name='email'
              placeholder='Email'
              className="form-control"
              value={this.state.email}
              onChange={this.handleInputChange} />
           </div>

           <div className="form-group">
            <Input type='password'
              name='password'
              placeholder='Password'
              className="form-control"
              value={this.state.password}
              onChange={this.handleInputChange} />
            </div>

          <div className="form-group">
            <Input type='password'
              name='password_confirmation'
              placeholder='Confirm password'
              className="form-control"
              value={this.state.password_confirmation}
              onChange={this.handleInputChange} />
           </div>
          <Button
            type="submit"
            color="primary"
            onClick={this.handleRegistrationClick}
            >
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: bindActionCreators(signUp, dispatch),
   }
};

export default connect(null, mapDispatchToProps)(SignUpForm);
