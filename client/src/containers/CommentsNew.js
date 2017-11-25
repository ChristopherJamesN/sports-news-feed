import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateNote} from '../actions';
import { Modal, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class CommentsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      description: this.props.description,
      link: this.props.link,
      comments: this.props.comments,
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
    this.close();
    const { updateNote , history } = this.props
    updateNote(this.props.id, this.state.name, this.state.description, this.state.link, this.state.comments);
    history.push('/notes');
  }

  handleOnChange = event => {
    this.setState({
      comments: event.target.value
    });
  }

  render() {
    return (
      <div>

      <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Add Comment
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleOnSubmit} >
              <div className="form-group">
                <input
                  type="text"
                  placeholder={this.props.comments}
                  comment="comment"
                  className="form-control"
                  onChange={this.handleOnChange} />
              </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  >Add Comment</button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateNote: updateNote
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(withRouter(CommentsNew));
