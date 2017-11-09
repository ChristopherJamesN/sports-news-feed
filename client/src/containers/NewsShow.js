import React from 'react';
import { connect } from 'react-redux';
import NotesNew from './NotesNew'

const NewsShow = ({ newsItem }) =>
  <div className="col-md-12">
    <h2>Name: {newsItem.title}</h2>
    <p>Description: {newsItem.description}</p>
    <a href={newsItem.url} target="_blank">Link to Full Story</a>
    <NotesNew></NotesNew>
  </div>;

const mapStateToProps = (state, ownProps) => {
  const newsItem = state.news.news.find(newsItem => newsItem.publishedAt == ownProps.match.params.newsItemPublishedAt)

  if (newsItem) {
    return { newsItem }
  } else {
    return { newsItem: {} }
  }
};

export default connect(mapStateToProps)(NewsShow);
