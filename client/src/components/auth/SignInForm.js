import React, { Component } from 'react';
import { Button, Form, Input, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { jwt } from '../../actions';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      visible: true
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

  handleSignInClick = (event) => {
    if (this.state.password === '') {
      this.setState({ visible: true });
    }
    else if (this.state.email ==='') {
      this.setState({ visible: true });
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
      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>All fields must be filled in.</Alert>
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
