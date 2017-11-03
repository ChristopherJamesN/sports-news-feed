import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchNotes } from '../actions';
import NotesNew from './NotesNew';
import NotesShow from './NotesShow';
import NotesList from '../components/NotesList';

class NotesPage extends Component {

  componentDidMount() {
    this.props.fetchNotes();
  }

  render() {
    return (
      <div>Notes Page
        <NotesShow />
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
}

export default connect(mapStateToProps, { fetchNotes })(NotesPage);
