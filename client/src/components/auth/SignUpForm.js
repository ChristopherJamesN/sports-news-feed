import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      name: '',
    };
  }

  getMetaContent = (name) => {
    var metas = document.getElementsByTagName('meta');

    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == name) {
        return metas[i].getAttribute("content");
      }
    }

    return "";
  }

  _handleInputChange = (event) => {
    // Get a deep clone of the component's state before the input change.
    var nextState = _.cloneDeep(this.state);

    //Update the state of the component
    nextState[event.target.name] = event.target.value;

    // Update the component's state with the new state
    this.setState(nextState);
  }

  _handleRegistrationClick = () => {
    $.ajax({
      method: "POST",
      url: "/users.json",
      data: {
        user: {
          email: this.state.email,
          uid: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          provider: "email"
        },
        authenticity_token: this.getMetaContent("csrf-token")
      }
    })
    .done(function(data){
      window.reload();
    });
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
              onChange={this._handleInputChange} />
           </div>

           <div className="form-group">
            <input type='password'
              name='password'
              placeholder='Password'
              className="form-control"
              value={this.state.password}
              onChange={this._handleInputChange} />
            </div>

          <div className="form-group">
            <input type='password'
              name='password_confirmation'
              placeholder='Confirm password'
              className="form-control"
              value={this.state.password_confirmation}
              onChange={this._handleInputChange} />
           </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this._handleRegistrationClick}
            >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
};

export default SignUpForm;
