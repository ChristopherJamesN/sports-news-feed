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
      updateNote(this.state.name, this.state.description);
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
