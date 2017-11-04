import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NewsList from '../components/NewsList';
import NewsShow from './NewsShow';
import fetchNews from '../actions/index';

class NewsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      content: '',
    };
  }

  componentWillMount() {
    fetchNews();
  }

  render() {
    const { match, news } = this.props;

    return (
      <div>
        <NewsList news={news} />
        <Switch>
          <Route path={`${match.url}/:newsItemId`} component={NewsShow}/>
          <Route exact path={match.url} render={() => (
            <h3>Please select a news item from the list.</h3>
          )}/>
        </Switch>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    news: state.news
  };
}

export default connect(mapStateToProps)(NewsPage);
