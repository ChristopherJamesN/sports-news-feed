import React, { Component } from 'react';
import { connect } from 'react-redux';
import {persistNote} from '../actions';
import { Modal, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class NotesNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      link: this.props.link,
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
    const { persistNote , history } = this.props
    persistNote(this.state.name, this.state.description, this.state.link);
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

      <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Add a Note
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleOnSubmit} >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="form-control"
                  onChange={this.handleOnChange} />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  className="form-control"
                  onChange={this.handleOnChange} />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  value={this.props.link}
                  placeholder='Link to associated article'
                  name="link"
                  className="form-control"
                  onChange={this.handleOnChange} />
              </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  >Add Note</button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    persistNote: persistNote
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(withRouter(NotesNew));
