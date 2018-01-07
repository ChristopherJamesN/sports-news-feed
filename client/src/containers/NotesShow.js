import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateNote} from '../actions';
import BackButton from '../components/BackButton';
import DeleteButton from '../components/DeleteButton';
import CommentsNew from './CommentsNew';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem } from 'reactstrap';

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
          <BackButton /> &nbsp;
          <DeleteButton noteId={this.props.note.id} />
        </div>
        <br></br>
        <ListGroup>
            <ListGroupItem><h3>{this.props.note.name}</h3></ListGroupItem>
        </ListGroup>
        <ListGroup>
            <ListGroupItem><p>{this.props.note.description}</p></ListGroupItem>
        </ListGroup>
        {this.props.note.comments.length > 0 ? (
        <ListGroup>
            <ListGroupItem>{this.props.note.comments.map((comment, index) => <p key={index}>{comment}</p>)}</ListGroupItem>
        </ListGroup>
        ): (
          <ListGroup>
              <ListGroupItem>No comments yet.</ListGroupItem>
          </ListGroup>
        )}
        <ListGroup>
            <ListGroupItem><a href={this.props.note.link} target="_blank">Link to Associated Article</a></ListGroupItem>
        </ListGroup>
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
