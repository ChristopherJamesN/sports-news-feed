import React, { Component } from 'react';
import { connect } from 'react-redux';
import {persistNote} from '../actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class NotesNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      description: this.props.description,
      link: this.props.link,
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    const { persistNote , history } = this.props
    persistNote(this.state.name, this.state.description, this.state.link);
    history.push('/notes');
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          <Button color="primary" onClick={this.toggle}>Favorite Story</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
              <ModalHeader toggle={this.toggle}>Favorite Story</ModalHeader>
              <ModalBody>
                <form onSubmit={this.handleOnSubmit} >
                  <div className="form-group">
                    <input
                      type="text"
                      value={this.props.name}
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      disabled="true"
                      onChange={this.handleOnChange} />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={this.props.description}
                      placeholder="Description"
                      name="description"
                      className="form-control"
                      disabled="true"
                      onChange={this.handleOnChange} />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={this.props.link}
                      placeholder='Link to associated article'
                      name="link"
                      className="form-control"
                      disabled="true"
                      onChange={this.handleOnChange} />
                  </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      >Favorite Story</button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </div>     );
      } else {
        return (
          <div>
            <p>Log in or sign up to favorite stories.</p>
          </div>
        );
      }
  }
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    persistNote: persistNote
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NotesNew));
