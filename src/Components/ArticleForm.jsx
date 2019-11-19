import React, { Component } from 'react';
import * as api from '../api';

class ArticleForm extends Component {
  state = {
    titleInput: '',
    bodyInput: '',
    topicInput: ''
  };

  render() {
    const { titleInput, bodyInput } = this.state;

    return (
      <form id="article-form" onSubmit={this.handleSubmit}>
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
            <option value="coding">coding</option>
          </select>
        </label>
        <button className="btn-primary">Post New Article</button>
      </form>
    );
  }

  handleChange = e => {
    const input = e.target.name;
    const value = e.target.value;

    this.setState({ [input]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { titleInput, bodyInput, topicInput } = this.state;
    const { currentUser } = this.props;

    api.postArticle(titleInput, bodyInput, topicInput, currentUser).then(article => {
      this.props.renderNewArticle(article);
    });
  };
}

export default ArticleForm;
