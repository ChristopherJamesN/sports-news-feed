import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'reactstrap';

const NotesList = ({ notes }) => {

    notes.sort(function(a,b) {
      return a.id - b.id;
    });
    const renderNotes = notes.map((note, index) =>
      <ListGroup key={note.id}><Link key={note.id} className="list-group-item list-group-item-action" to={`/notes/${note.id}`}>{note.name}</Link></ListGroup>
    );

  return (
    <div>
      {renderNotes}
    </div>
  );
};

export default NotesList;
