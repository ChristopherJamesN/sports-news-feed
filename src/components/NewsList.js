import React from 'react';
import { Link } from 'react-router-dom';

const NewsList = ({ news }) => {

  const renderNews = news.map(newsItem =>
    <Link style={{ marginRight: '12px' }} key={newsItem.publishedAt} to={`/news/${newsItem.publishedAt}`}>{newsItem.title}</Link>
  );

  return (
    <div>
      {renderNews}
    </div>
  );
};

export default NewsList;
