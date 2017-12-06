import React from 'react';
import { connect } from 'react-redux';
import NotesNew from './NotesNew';
import BackButton from '../components/BackButton'
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';

const NewsShow = ({ newsItem }) =>
  <div>
    <div>
      <BackButton />
    </div>
    <br></br>
    <Panel header={newsItem.title} bsStyle="primary">
      <ListGroup fill>
        <ListGroupItem>
          <p>{newsItem.description}</p>
        </ListGroupItem>
        <ListGroupItem>
          <a href={newsItem.url} target="_blank">Link to Full Story</a>
        </ListGroupItem>
      </ListGroup>
    </Panel>
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
