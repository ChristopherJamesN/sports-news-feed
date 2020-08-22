import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NewsList from '../components/NewsList';
import NewsShow from './NewsShow';
import { fetchSportsNews } from '../actions';
import { bindActionCreators } from 'redux';

class NewsPage extends Component {
  componentDidMount() {
    this.props.fetchSportsNews();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            path={`${this.props.match.url}/:newsItemPublishedAt`}
            component={NewsShow}
          />
          <Route
            exact
            path={this.props.match.url}
            render={() => (
              <div>
                <h3>Select a news item from the list to see more details.</h3>
                <NewsList news={this.props.news} />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.newsReducer.news,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSportsNews: bindActionCreators(fetchSportsNews, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
