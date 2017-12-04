import React, { Component } from 'react';
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

  handleSignInClick = () => {
    this.setState({
      loading: true
    });
    const data = `{"auth":{"email":"${this.state.email}","password":"${this.state.password}"}}`
    this.props.jwt(data, this.props.history);
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
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSignInClick}
              >
              Login
            </button>
        </form>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ jwt }, dispatch);
};

export default connect(null, mapDispatchToProps)(SignInForm);
