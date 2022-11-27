import React, { Component } from 'react';
import { Button } from 'reactstrap';

class BackButton extends Component {
  static contextTypes = {
    router: () => null,
  };

  goBack = () => {
    window.history.back();
  };

  render() {
    return (
      <Button color="primary" onClick={this.goBack}>
        Back
      </Button>
    );
  }
}

export default BackButton;
