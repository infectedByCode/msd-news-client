import React, { Component } from 'react';
import * as api from '../api';
import TopicCard from './TopicCard';
import ErrorPage from './ErrorPage';

class TopicList extends Component {
  state = {
    topicData: [],
    isLoading: true,
    error: null
  };

  render() {
    const { topicData, isLoading, error } = this.state;

    if (isLoading)
      return (
        <img
          id="loadingGif"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
          alt="loading page"
        />
      );

    if (error) return <ErrorPage error={error} />;
    return (
      <aside>
        {this.props.topic
          ? <h1>
              {this.props.topic}
            </h1>
          : <h3>Choose a newsbit</h3>}
        <ul>
          {topicData.map(topic => {
            return <TopicCard key={topic.slug} topic={topic} />;
          })}
        </ul>
      </aside>
    );
  }

  componentDidMount() {
    this.fetchTopicData();
  }

  fetchTopicData = () => {
    api.getTopics().then(topicData => this.setState({ topicData, isLoading: false })).catch(error => {
      const { status, statusText } = error.response;
      this.setState({ error: { status, msg: statusText }, isLoading: false });
    });
  };
}

export default TopicList;
