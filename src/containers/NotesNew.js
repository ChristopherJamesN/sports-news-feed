import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote } from '../actions';

class NotesNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const { addNote, history } = this.props
    addNote(this.state);
    history.push('/notes');
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h2>Add a Note</h2>
        <form onSubmit={this.handleOnSubmit} >
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={this.handleOnChange} />
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={this.handleOnChange} />
          <input
            type="submit"
            value="Add Note" />
        </form>
      </div>
    );
  }
};

export default connect(null, { addNote })(NotesNew);
