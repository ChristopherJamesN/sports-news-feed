import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class VoteButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  handleUpvote = () => {
    this.setState({count: this.state.count + 1})
  }

  handleDownvote = () => {
    this.setState({count: this.state.count - 1})
  }

  render() {
    return (
      <div>
        <Button
          onClick={this.handleUpvote}>
            Upvote
        </Button>
        <Button
          onClick={this.handleDownvote}>
            Downvote
        </Button>
        <div>
          Votes: {this.state.count}
        </div>
      </div>
    )
  }

}

export default VoteButton;
