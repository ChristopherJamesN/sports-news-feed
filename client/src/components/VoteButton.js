import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class VoteButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleOnClick = () => {
    this.setState({count: this.state.count + 1})
  }

  render() {
    return (
      <div>
      <Button
        onClick={this.handleOnClick}>
          {this.state.count}
      </Button>
      </div>
    )
  }

}

export default VoteButton;
