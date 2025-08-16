import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'reactstrap';
import BackButton from '../components/BackButton';
import NotesNew from './NotesNew';

const NewsShow = ({ newsItem }) => (
  <div>
    <div>
      <BackButton />
    </div>
    <br />
    <ListGroup>
      <ListGroupItem>
        <h3> {newsItem.title} </h3>
      </ListGroupItem>
    </ListGroup>
    <ListGroup>
      <ListGroupItem>
        <p>{newsItem.description}</p>
      </ListGroupItem>
    </ListGroup>
    <ListGroup>
      <ListGroupItem>
        <p>{'Source: ' + newsItem.source}</p>
      </ListGroupItem>
    </ListGroup>
    <ListGroup>
      <ListGroupItem>
        <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
          Link to Full Story
        </a>
      </ListGroupItem>
    </ListGroup>
    <br />
    <div>
      <NotesNew
        link={newsItem.url}
        name={newsItem.title}
        description={newsItem.description}
      />
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  // eslint-disable-next-line
  const newsItem = state.newsReducer.news.find(
    (newsItem) =>
      newsItem.publishedAt === ownProps.match.params.newsItemPublishedAt
  );

  if (newsItem) {
    return { newsItem };
  } else {
    return { newsItem: {} };
  }
};

export default connect(mapStateToProps)(NewsShow);
