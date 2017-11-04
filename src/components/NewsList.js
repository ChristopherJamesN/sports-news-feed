import React from 'react';
import { Link } from 'react-router-dom';
import fetchNews from '../actions/index';

componentWillMount() {
  fetchNews();
}

const NewsList = ({ news }) => {
  const renderNews = news.map(newsItem =>
    <Link style={{ marginRight: '12px' }} key={newsItem.id} to={`/news/${newsItem.id}`}>{newsItem.name}</Link>
  );

  return (
    <div>
      {renderNews}
    </div>
  );
};

export default NewsList;
