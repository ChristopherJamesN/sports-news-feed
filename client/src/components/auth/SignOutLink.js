import React, { Component } from 'react';
import $ from 'jquery';

class SignOutLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
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

  _signOut = () => {
    $.ajax({
      method: "DELETE",
      url: "/users/sign_out.json",
      data: {
        authenticity_token: this.getMetaContent("csrf-token")
      }
    });
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this._signOut}>Sign out</a>
      </div>
    );
  }
};

export default SignOutLink;
