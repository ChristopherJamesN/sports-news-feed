import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const NewsList = ({ news }) => {

  const renderNews = news.filter(newsItem => newsItem.title).map((newsItem, index) =>
      <ListGroupItem key={index}><Link style={{ marginRight: '12px' }} key={index} to={`/news/${newsItem.publishedAt}`}>{newsItem.title || "Story not found"}</Link></ListGroupItem>
  );

  return (
    <div>
      <ListGroup>
        {renderNews}
      </ListGroup>
    </div>
  );
};

export default NewsList;
