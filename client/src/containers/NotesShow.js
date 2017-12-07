import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateNote} from '../actions';
import BackButton from '../components/BackButton';
import CommentsNew from './CommentsNew';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

class NotesShow extends Component {

    constructor(props) {
      super(props);
      this.state = {
        name: this.props.note.name,
        description: this.props.note.description,
        link: this.props.note.link,
        comments: this.props.note.comments,
      };
    }

  render() {
    return (
      <div>
        <div>
          <BackButton />
        </div>
        <br></br>
        <Panel header={this.props.note.name} bsStyle="primary">
          <ListGroup fill>
            <ListGroupItem>
              <p>Description: {this.props.note.description}</p>
            </ListGroupItem>
            <ListGroupItem>
              {this.props.note.comments.map((comment, index) => <p key={index}>{comment}</p>)}
            </ListGroupItem>
            <ListGroupItem>
              <a href={this.props.note.link} target="_blank">Link to Associated Article</a>
            </ListGroupItem>
          </ListGroup>
        </Panel>
        <br></br>
        <div>
          <CommentsNew id={this.props.note.id} name={this.props.note.name} description={this.props.note.description} link={this.props.note.link}/>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  // eslint-disable-next-line
  const note = state.notesReducer.notes.find(note => note.id == ownProps.match.params.noteId)

  if (note) {
    return { note }
  } else {
    return { note: {} }
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNote: updateNote
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(NotesShow);
