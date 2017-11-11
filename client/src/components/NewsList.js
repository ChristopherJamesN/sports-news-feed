import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const NewsList = ({ news }) => {

  const renderNews = news.map((newsItem, index) =>
    <ListGroupItem><Link style={{ marginRight: '12px' }} key={newsItem.publishedAt} to={`/news/${newsItem.publishedAt}`}>{newsItem.title}<br></br></Link></ListGroupItem>
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
