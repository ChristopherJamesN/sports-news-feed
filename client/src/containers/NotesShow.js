import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateNote} from '../actions';
import BackButton from '../components/BackButton';
import CommentsNew from './CommentsNew';
import { Panel, ListGroup, ListGroupItem, Well, Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

class NotesShow extends Component {

    constructor(props) {
      super(props);
      this.state = {
        name: this.props.note.name,
        description: this.props.note.description,
        link: this.props.note.link,
        comments: this.props.note.comments,
        showModal: false,
      };
    }

    close = () => {
      this.setState({ showModal: false });
    }

    open = () => {
      this.setState({ showModal: true });
    }

    handleOnSubmit = event => {
      event.preventDefault();
      const { updateNote, history } = this.props
      updateNote(this.props.note.id, this.state.name, this.state.description, this.state.link, this.state.comments);
      history.push('/notechanges');
    }

    handleOnChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

  render() {
    return (
      <div>
        <Well>
          <BackButton />
        </Well>
        <Panel header={this.props.note.name} bsStyle="primary">
          <ListGroup fill>
            <ListGroupItem>
              <p>Description: {this.props.note.description}</p>
            </ListGroupItem>
            <ListGroupItem>
              {this.props.note.comments.map((comment, index) => <p>{comment}</p>)}
            </ListGroupItem>
            <ListGroupItem>
              <a href={this.props.note.link} target="_blank">Link to Associated Article</a>
            </ListGroupItem>
          </ListGroup>
        </Panel>
        <Well>
          <CommentsNew id={this.props.note.id} name={this.props.note.name} description={this.props.note.description} link={this.props.note.link}/>
        </Well>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  // eslint-disable-next-line
  const note = state.notes.notes.find(note => note.id == ownProps.match.params.noteId)

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
