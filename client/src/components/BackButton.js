import React, { Component } from 'react';

class BackButton extends Component {
  static contextTypes = {
    router: () => true,
  }

  render() {
    return (
      <button
        className="button icon-left"
        onClick={this.context.router.history.goBack}>
          Back
      </button>
    )
  }
}

export default BackButton;
