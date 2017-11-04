import React from 'react';
import { connect } from 'react-redux';

const NewsShow = ({ newsItem }) =>
  <div className="col-md-8">
    <h2>Name: {newsItem.name}</h2>
    <p>Content: {newsItem.content}</p>
  </div>;

const mapStateToProps = (state, ownProps) => {
  const newsItem = state.news.find(newsItem => newsItem.id == ownProps.match.params.newsItemId)

  if (newsItem) {
    return { newsItem }
  } else {
    return { newsItem: {} }
  }
};

export default connect(mapStateToProps)(NewsShow);
