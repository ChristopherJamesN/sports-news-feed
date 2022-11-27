import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteNote } from '../actions';

class DeleteButton extends Component {
  static contextTypes = {
    router: () => null,
  };

  handleClick = () => {
    const { deleteNote, history } = this.props;
    deleteNote(this.props.noteId);
    history.push('/notes');
  };

  render() {
    return (
      <Button color="primary" onClick={this.handleClick}>
        Delete Story
      </Button>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      deleteNote: deleteNote,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(DeleteButton));
