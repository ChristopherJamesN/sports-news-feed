import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'reactstrap';

const allowedSources = new Set(['ESPN', 'Bleacher Report', 'Sky Sports']);

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
      .filter(
        (newsItem) =>
          newsItem && newsItem.title && allowedSources.has(newsItem.source)
      )
      .map((newsItem, index) => (
        <Link
          key={index}
          className="list-group-item list-group-item-action"
          to={`/news/${newsItem.publishedAt}`}
        >
          <ListGroup key={index}>
            <div>{newsItem.title || 'Story not found'}</div>
            <div>{'Source: ' + (newsItem.source || '')}</div>
          </ListGroup>
        </Link>
      ));
  }
  return <div>{renderNews}</div>;
};

export default NewsList;
