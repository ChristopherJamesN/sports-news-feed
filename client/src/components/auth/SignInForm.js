import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  _handleSignInClick = () => {
    $.ajax({
      method: "POST",
      url: "/users/sign_in.json",
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        },
        authenticity_token: this.getMetaContent("csrf-token")
      }
    })
    .done(function(data){
      window.reload();
    }.bind(this));
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
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this._handleSignInClick}
              >
              Login
            </button>
        </form>
      </div>
    );
  }
};

export default SignInForm;
