import React, { Component } from 'react';
import { Button } from 'reactstrap';

class DeleteButton extends Component {
  static contextTypes = {
    router: () => null,
  }

  render() {
    return (
      <Button
        color="danger"
        onClick={this.context.router.history.goBack}>
          Delete Story
      </Button>
    )
  }
}

export default DeleteButton;
