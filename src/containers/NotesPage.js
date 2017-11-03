import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNotes } from '../actions';
import NotesShow from './NotesShow';

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
