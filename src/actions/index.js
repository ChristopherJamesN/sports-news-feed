export function addNote(note){
  return {
    type: 'ADD_NOTE',
    note
  };
};

export function fetchNotes() {
  const notes = [
    {id: 1, name: 'First', description: 'The first note.'},
    {id: 2, name: 'Second', description: 'The second note.'},
    {id: 3, name: 'Third', description: 'The third note.'}
  ];
  return {
    type: 'FETCH_NOTES',
    notes
  };
}

export default function fetchNews() {
  const news = [
    {id: 1, name: 'First news article', content: 'The first news article.'},
    {id: 2, name: 'Second news article', content: 'The second news article.'},
    {id: 3, name: 'Third news article', content: 'The third news article.'}
  ];
  return {
    type: 'FETCH_NEWS',
    news
  };
}
