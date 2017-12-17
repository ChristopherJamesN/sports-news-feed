import React from 'react';
import { ListGroup } from 'reactstrap';

const NotesList = ({ notes }) => {

    notes.sort(function(a,b) {
      return a.id - b.id;
    });
    const renderNotes = notes.map((note, index) =>
      <ListGroup key={note.id}><a key={note.id} className="list-group-item list-group-item-action" href={`/notes/${note.id}`}>{note.name}</a></ListGroup>
    );

  return (
    <div>
      {renderNotes}
    </div>
  );
};

export default NotesList;
