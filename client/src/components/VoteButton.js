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

  callApi = () => {
    console.log('a')
    fetch('/api/notes')
        .then(response => {
          console.log('b')
          return response.json()
        }).then(payload => console.log('c', payload))
        console.log('d')
  }

  render() {
    return (
      <div>
      <Button
        onClick={this.handleOnClick}>
          {this.state.count}
      </Button>
      <Button
        onClick={this.callApi}>
          Call Api
      </Button>
      </div>
    )
  }

}

export default VoteButton;
