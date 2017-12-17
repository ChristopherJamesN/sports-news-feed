import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

const NewsList = ({ news }) => {

  const renderNews = news.filter(newsItem => newsItem.title).map((newsItem, index) =>
      <ListGroup key={index}><a key={index} className='list-group-item list-group-item-action' href={`/news/${newsItem.publishedAt}`}>{newsItem.title || "Story not found"}</a></ListGroup>
  );

  return (
    <div>
      {renderNews}
    </div>
  );
};

export default NewsList;
