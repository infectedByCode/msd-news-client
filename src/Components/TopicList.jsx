import React, { Component } from 'react';
import * as api from '../api';
import TopicCard from './TopicCard';

class TopicList extends Component {
  state = {
    topicData: [],
    isLoading: true
  };

  render() {
    const { topicData, isLoading } = this.state;

    if (isLoading)
      return (
        <img
          id="loadingGif"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
          alt="loading page"
        />
      );
    return (
      <aside>
        {this.props.topic
          ? <h1>
              {this.props.topic}
            </h1>
          : <h3>Choose a newsbit</h3>}
        <ul>
          <TopicCard topics={topicData} />
        </ul>
      </aside>
    );
  }

  componentDidMount() {
    this.fetchTopicData();
  }

  fetchTopicData = () => {
    api.getTopics().then(topicData => this.setState({ topicData, isLoading: false }));
  };
}

export default TopicList;
