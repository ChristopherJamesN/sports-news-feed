import React, { Component } from 'react';
import $ from 'jquery';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSignInClick = () => {
    const email = this.state.email
    const password = this.state.password
    const request = {"auth": {"email": email, "password": password}}
    console.log(request)
    $.ajax({
      url: "http://localhost:3000/api/user_token",
      type: "POST",
      data: request,
      dataType: "json",
      success: function (result) {
        console.log(result)
        localStorage.setItem("jwt", result.jwt)
      }
    })
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

export default SignInForm;
