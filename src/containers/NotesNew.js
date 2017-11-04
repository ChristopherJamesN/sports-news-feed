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
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="form-control"
              onChange={this.handleOnChange} />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Description"
              name="description"
              className="form-control"
              onChange={this.handleOnChange} />
          </div>
            <button
              type="submit"
              className="btn btn-primary"
              >Add Note</button>
        </form>
      </div>
    );
  }
};

export default connect(null, { addNote })(NotesNew);
