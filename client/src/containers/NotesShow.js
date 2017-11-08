import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateNote} from '../actions';

const NotesShow = ({ note }) =>

    constructor(props) {
      super(props);
      this.state = {
        name: this.state.name,
        description: this.state.description,
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

  <div className="col-md-12">
    <h2>Name: {note.name}</h2>
    <p>Description: {note.description}</p>
  </div>;

const mapStateToProps = (state, ownProps) => {
  const note = state.notes.notes.find(note => note.id == ownProps.match.params.noteId)

  if (note) {
    return { note }
  } else {
    return { note: {} }
  }
};

export default connect(mapStateToProps)(NotesShow);
