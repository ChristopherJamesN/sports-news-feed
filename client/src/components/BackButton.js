import React, { Component } from 'react';
import { Button } from 'reactstrap';

class BackButton extends Component {
  static contextTypes = {
    router: () => null,
  }

  render() {
    return (
      <Button
        color="primary"
        onClick={this.context.router.history.goBack}>
          Back
      </Button>
    )
  }
}

export default BackButton;
