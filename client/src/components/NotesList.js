import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const NotesList = ({ notes }) => {

  const renderNotes = notes.map((note, index) =>
    <ListGroupItem key={note.id}><Link style={{ marginRight: '12px' }} key={note.id} to={`/notes/${note.id}`}>{note.name}<br></br></Link></ListGroupItem>
  );

  return (
    <div>
      <ListGroup>
        {renderNotes}
      </ListGroup>
    </div>
  );
};

export default NotesList;
