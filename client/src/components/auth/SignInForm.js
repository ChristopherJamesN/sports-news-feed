import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { jwt } from '../../actions';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSignInClick = (event) => {
    if (this.state.password === '') {
      return 'Password must be valid.'
    }
    else if (this.state.email ==='') {
      return 'Email must be valid.'
    }
    else {
      this.setState({
        loading: true
      });
      const data = `{"auth":{"email":"${this.state.email}","password":"${this.state.password}"}}`
      event.preventDefault();
      this.props.jwt(data, this.props.history);
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
            <Button
              type="submit"
              color="primary"
              onClick={this.handleSignInClick}
              >
              Login
            </Button>
        </Form>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ jwt }, dispatch);
};

export default connect(null, mapDispatchToProps)(SignInForm);
