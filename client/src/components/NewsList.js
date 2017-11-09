import React from 'react';
import { Link } from 'react-router-dom';

const NewsList = ({ news }) => {

  const renderNews = news.map((newsItem, index) =>
    <Link style={{ marginRight: '12px' }} key={newsItem.publishedAt} to={`/news/${newsItem.publishedAt}`}>{index+1}. {newsItem.title}<br></br></Link>
  );

  return (
    <div>
      {renderNews}
    </div>
  );
};

export default NewsList;
