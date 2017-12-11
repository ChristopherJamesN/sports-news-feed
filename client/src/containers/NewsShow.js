import React from 'react';
import { connect } from 'react-redux';
import NotesNew from './NotesNew';
import BackButton from '../components/BackButton'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const NewsShow = ({ newsItem }) =>
  <div>
    <div>
      <BackButton />
    </div>
    <br></br>
    <Breadcrumb>
        <BreadcrumbItem><h3> {newsItem.title} </h3></BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
        <BreadcrumbItem><p>{newsItem.description}</p></BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb>
        <BreadcrumbItem><a href={newsItem.url} target="_blank">Link to Full Story</a></BreadcrumbItem>
    </Breadcrumb>
    <br></br>
    <div>
      <NotesNew link={newsItem.url} name={newsItem.title} description={newsItem.description}></NotesNew>
    </div>
  </div>;

const mapStateToProps = (state, ownProps) => {
  // eslint-disable-next-line
  const newsItem = state.newsReducer.news.find(newsItem => newsItem.publishedAt == ownProps.match.params.newsItemPublishedAt)

  if (newsItem) {
    return { newsItem }
  } else {
    return { newsItem: {} }
  }
};

export default connect(mapStateToProps)(NewsShow);
