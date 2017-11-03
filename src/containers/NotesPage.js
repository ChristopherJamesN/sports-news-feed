import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NotesList from '../components/NotesList';
import NotesShow from './NotesShow';
import NotesNew from './NotesNew';

const NotesPage = ({ match, notes }) =>
  <div>
    <NotesList notes={notes} />
    <Route path={`${match.url}/new`} component={NotesNew} />
    <Route path={`${match.url}/:noteId`} component={NotesShow}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a Note from the list.</h3>
    )}/>
  </div>;

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
}

export default connect(mapStateToProps)(NotesPage);
