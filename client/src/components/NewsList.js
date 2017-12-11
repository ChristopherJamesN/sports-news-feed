import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const NewsList = ({ news }) => {

  const renderNews = news.filter(newsItem => newsItem.title).map((newsItem, index) =>
      <Breadcrumb key={index}><BreadcrumbItem key={index}><Link style={{ marginRight: '12px' }} key={index} to={`/news/${newsItem.publishedAt}`}>{newsItem.title || "Story not found"}</Link></BreadcrumbItem></Breadcrumb>
  );

  return (
    <div>
      {renderNews}
    </div>
  );
};

export default NewsList;
