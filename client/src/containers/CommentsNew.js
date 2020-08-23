import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { updateNote } from '../actions';

class CommentsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: '',
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const { updateNote, history } = this.props;
    updateNote(
      this.props.id,
      this.props.name,
      this.props.description,
      this.props.link,
      this.state.comments
    );
    history.push('/notes/' + this.props.id);
    this.toggle();
  };

  handleOnChange = (event) => {
    this.setState({
      comments: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Add Comment
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.name}</ModalHeader>
          <ModalBody>
            <form onSubmit={this.handleOnSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="comments"
                  className="form-control"
                  onChange={this.handleOnChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Comment
              </button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateNote: updateNote,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(withRouter(CommentsNew));
