import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const NotesList = ({ notes }) => {

    notes.sort(function(a,b) {
      return a.id - b.id;
    });
    const renderNotes = notes.map((note, index) =>
      <Breadcrumb key={note.id}><BreadcrumbItem key={note.id}><Link style={{ marginRight: '12px' }} key={note.id} to={`/notes/${note.id}`}>{note.name}</Link></BreadcrumbItem></Breadcrumb>
    );

  return (
    <div>
      {renderNotes}
    </div>
  );
};

export default NotesList;
