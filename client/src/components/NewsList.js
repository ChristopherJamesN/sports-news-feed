import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'reactstrap';

const NewsList = ({ news }) => {
  let renderNews = (
    <ListGroup key={1}>
      <Link
        key={1}
        className="list-group-item list-group-item-action"
        to={`/news`}
      >
        {'No stories found'}
      </Link>
    </ListGroup>
  );
  if (news) {
    renderNews = news
      .filter((newsItem) => newsItem.title)
      .map((newsItem, index) => (
        <ListGroup key={index}>
          <Link
            key={index}
            className="list-group-item list-group-item-action"
            to={`/news/${newsItem.publishedAt}`}
          >
            {newsItem.title || 'Story not found'}
          </Link>
        </ListGroup>
      ));
  }
  return <div>{renderNews}</div>;
};

export default NewsList;
