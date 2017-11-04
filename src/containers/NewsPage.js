import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NewsList from '../components/NewsList';
import NewsShow from './NewsShow';
import { fetchNews } from '../actions';
import { bindActionCreators } from 'redux';

class NewsPage extends Component {

  componentDidMount() {
    fetchNews();
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path={`${this.props.match.url}/:newsItemId`} component={NewsShow}/>
          <Route exact path={this.props.match.url} render={() => (
            <h3>Please select a news item from the list.</h3>
          )}/>
        </Switch>
        <NewsList news={this.props.news} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  bindActionCreators({fetchNews: fetchNews}, dispatch)
}

const mapStateToProps = (state) => {
  return {
    news: state.news
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
