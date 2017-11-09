import React from 'react';
import { Link } from 'react-router-dom';

const NotesList = ({ notes }) => {

  const renderNotes = notes.map((note, index) =>
    <Link style={{ marginRight: '12px' }} key={note.id} to={`/notes/${note.id}`}>{index+1}. {note.name}<br></br></Link>
  );

  return (
    <div>
      {renderNotes}
    </div>
  );
};

export default NotesList;
