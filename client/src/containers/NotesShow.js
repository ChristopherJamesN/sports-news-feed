import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateNote} from '../actions';
import BackButton from '../components/BackButton'
import { Panel, ListGroup, ListGroupItem, Well, Modal, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

class NotesShow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.note.name,
        description: this.props.note.description,
        link: this.props.note.link,
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
      updateNote(this.props.note.id, this.state.name, this.state.description, this.state.link);
      history.push('/notes');
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
              <a href={this.props.note.link} target="_blank">Link to Associated Article</a>
            </ListGroupItem>
          </ListGroup>
        </Panel>

        <Well>

        <Button
            bsStyle="primary"
            bsSize="large"
            onClick={this.open}
          >
            Update Note
          </Button>

          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Add a Note Here</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleOnSubmit} >
                <div className="form-group">
                  <input
                    type="text"
                    placeholder={this.props.note.name}
                    name="name"
                    className="form-control"
                    onChange={this.handleOnChange} />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder={this.props.note.description}
                    name="description"
                    className="form-control"
                    onChange={this.handleOnChange} />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder={this.props.note.link}
                    name="link"
                    className="form-control"
                    onChange={this.handleOnChange} />
                </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    >Update Note</button>
              </form>
            </Modal.Body>
          </Modal>
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
