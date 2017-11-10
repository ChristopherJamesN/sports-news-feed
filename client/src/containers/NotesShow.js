import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateNote} from '../actions';
import BackButton from '../components/BackButton'

class NotesShow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.note.name,
        description: this.props.note.description,
        link: this.props.note.link,
      };
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
      <div className="col-md-12">
        <BackButton />

        <h2>Name: {this.props.note.name}</h2>
        <p>Description: {this.props.note.description}</p>
        <a href={this.props.note.link} target="_blank">Link to Associated Article: {this.props.note.link}</a>

        <h4>Update Note</h4>
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
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const note = state.notes.notes.find(note => note.id == ownProps.match.params.noteId)

  if (note) {
    return { note }
  } else {
    return { note: {} }
  }
};

export default connect(mapStateToProps, { updateNote })(NotesShow);
