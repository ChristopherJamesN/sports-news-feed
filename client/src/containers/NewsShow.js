import React from 'react';
import { connect } from 'react-redux';
import NotesNew from './NotesNew';
import BackButton from '../components/BackButton'
import { Panel, ListGroup, ListGroupItem, Well } from 'react-bootstrap';

const NewsShow = ({ newsItem }) =>
  <div>
    <BackButton />
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
    <Well>
      <NotesNew link={newsItem.url}></NotesNew>
    </Well>
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
