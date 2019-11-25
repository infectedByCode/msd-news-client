import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import * as api from '../api';
import { throwStatement } from '@babel/types';

class ArticleForm extends Component {
  state = {
    titleInput: '',
    bodyInput: '',
    topicInput: '',
    topicData: [],
    articleCreated: false,
    isCreationError: false
  };

  render() {
    const { titleInput, bodyInput, topicData, articleCreated, isCreationError } = this.state;

    return (
      <form id="article-form" onSubmit={this.handleSubmit}>
        {articleCreated && <Alert variant="success">Article created</Alert>}
        {isCreationError && <Alert variant="danger">Error creating article, please try again.</Alert>}
        <label>
          title:
          <input type="text" name="titleInput" value={titleInput} onChange={this.handleChange} required />
        </label>
        <label>
          body:
          <textarea type="text" name="bodyInput" value={bodyInput} onChange={this.handleChange} required />
        </label>
        <label>
          newsbit:
          <select id="topic-selector" name="topicInput" onChange={this.handleChange} required>
            <option value="" />
            {topicData.map(topic => {
              return (
                <option key={topic.slug} value={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
          </select>
        </label>
        <button className="btn-primary">Post New Article</button>
      </form>
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

  handleChange = e => {
    const input = e.target.name;
    const value = e.target.value;

    this.setState({ [input]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { titleInput, bodyInput, topicInput } = this.state;
    const { currentUser } = this.props;

    api
      .postArticle(titleInput, bodyInput, topicInput, currentUser)
      .then(article => {
        this.props.renderNewArticle(article);
        this.setState({ articleCreated: true });
      })
      .catch(error => {
        if (error) this.setState({ isCreationError: true });
      });
    e.target[2].selectedIndex = 0;
    this.setState({ titleInput: '', bodyInput: '' });
  };
}

export default ArticleForm;
