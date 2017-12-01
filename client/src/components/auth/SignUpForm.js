import React, { Component } from 'react';
import _ from 'lodash';

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
          name: this.state.name,
          provider: "email"
        },
        authenticity_token: Functions.getMetaContent("csrf-token")
      }
    })
    .done(function(data){
      location.reload();
    }.bind(this));
  },

  render() {
    return (
      <div>
      <form>
          <input type='text'
            name='name'
            placeholder='name'
            value={this.state.name}
            onChange={this._handleInputChange} />

          <input type='email'
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this._handleInputChange} />

          <input type='password'
            name='password'
            placeholder='password'
            value={this.state.password}
            onChange={this._handleInputChange} />

          <input type='password'
            name='password_confirmation'
            placeholder='re-type password'
            value={this.state.password_confirmation}
            onChange={this.handleInputChange} />
        </div>
        <input onClick={this._handleRegistrationClick} defaultValue="sign up"/>
      </form>
      </div>
    );
  }
};

export default SignUpForm;
