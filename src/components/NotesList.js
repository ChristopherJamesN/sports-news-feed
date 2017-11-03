import React from 'react';
import { Link } from 'react-router-dom';

const NotesList = ({ notes }) => {
  const renderNotes = notes.map(note =>
    <Link style={{ marginRight: '12px' }} key={note.id} to={`/notes/${note.id}`}>{note.name}</Link>
  );

  return (
    <div>
      {renderNotes}
    </div>
  );
};

export default NotesList;
