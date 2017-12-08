import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const NotesList = ({ notes }) => {

  let renderNotes = notes.errors

  if (notes.errors) {
    notes.sort(function(a,b) {
      return a.id - b.id;
    });
    renderNotes = notes.map((note, index) =>
      <ListGroupItem key={note.id}><Link style={{ marginRight: '12px' }} key={note.id} to={`/notes/${note.id}`}>{note.name}</Link></ListGroupItem>
    );
  }

  return (
    <div>
      <ListGroup>
        {renderNotes}
      </ListGroup>
    </div>
  );
};

export default NotesList;
