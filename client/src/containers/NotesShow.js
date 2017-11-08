import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateNote} from '../actions';

class NotesShow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.note.name,
        description: this.props.note.description,
      };
    }

    handleOnSubmit = event => {
      event.preventDefault();
      const { updateNote, history } = this.props
      updateNote(this.props.note.id, this.state.name, this.state.description);
      history.push('/notes');
    }

    handleOnChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

  render() {
    return (
      <div className="col-md-12">
        <h2>Name: {this.props.note.name}</h2>
        <p>Description: {this.props.note.description}</p>

        <h4>Update Note</h4>
        <form onSubmit={this.handleOnSubmit} >
          <div className="form-group">
            <input
              type="text"
              placeholder={this.props.note.name}
              name="name"
              className="form-control"
              onChange={this.handleOnChange} />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder={this.props.note.description}
              name="description"
              className="form-control"
              onChange={this.handleOnChange} />
          </div>
            <button
              type="submit"
              className="btn btn-primary"
              >Update Note</button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const note = state.notes.notes.find(note => note.id == ownProps.match.params.noteId)

  if (note) {
    return { note }
  } else {
    return { note: {} }
  }
};

export default connect(mapStateToProps, { updateNote })(NotesShow);
