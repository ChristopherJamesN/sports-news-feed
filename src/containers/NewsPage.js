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
      news: []
    };
  }

  componentWillMount() {
    fetchNews();
  }

  render() {

    return (
      <div>
        <NewsList news={this.state.news} />
        <Switch>
          <Route path={`${this.props.match.url}/:newsItemId`} component={NewsShow}/>
          <Route exact path={this.props.match.url} render={() => (
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
