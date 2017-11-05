import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NotesList from '../components/NotesList';
import NotesShow from './NotesShow';
import NotesNew from './NotesNew';

const NotesPage = ({ match, notes }) =>
  <div>
    <Switch>
      <Route path={`${match.url}/new`} component={NotesNew} />
      <Route path={`${match.url}/:noteId`} component={NotesShow}/>
      <Route exact path={match.url} render={() => (
        <h3>Please select a note from the list.</h3>
      )}/>
    </Switch>
    <NotesList notes={notes} />
  </div>;

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
}

export default connect(mapStateToProps)(NotesPage);
