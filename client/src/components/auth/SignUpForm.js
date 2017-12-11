import React, { Component } from 'react';
import { Button, Form, Input, Alert } from 'reactstrap';
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

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleRegistrationClick = (event) => {

    if (this.state.password === '') {
      this.setState({ visible: true });
    }
    else if (this.state.email === '') {
      this.setState({ visible: true });
    }
    else if (this.state.password_confirmation === '') {
      this.setState({ visible: true });
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
      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>Invalid credentials.</Alert>
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

const mapStateToProps = (state) => {
  return {
    visible: state.userReducer.signupError
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: bindActionCreators(signUp, dispatch),
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
