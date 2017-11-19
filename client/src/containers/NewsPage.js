import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NewsList from '../components/NewsList';
import NewsShow from './NewsShow';
import { fetchNews, fetchFoxSports, fetchNFLNews } from '../actions';
import { bindActionCreators } from 'redux';

class NewsPage extends Component {

  componentDidMount() {
    this.props.fetchNews();
    this.props.fetchNFLNews();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path={`${this.props.match.url}/:newsItemPublishedAt`} component={NewsShow}/>
          <Route exact path={this.props.match.url} render={() => (
            <div>
              <h3>Select a news item from the list to see more details.</h3>
              <NewsList news={this.props.news} />
            </div>
          )}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news.news
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNews: bindActionCreators(fetchNews, dispatch),
    fetchFoxSports: bindActionCreators(fetchFoxSports, dispatch),
    fetchNFLNews: bindActionCreators(fetchNFLNews, dispatch)
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
