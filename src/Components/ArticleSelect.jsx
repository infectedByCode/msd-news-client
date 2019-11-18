import React, { Component } from 'react';

class ArticleSelect extends Component {
  state = {
    sort_by: 'created_at',
    order: 'desc'
  };

  render() {
    return (
      <select onChange={this.handleSelectChange}>
        <option value="created_at,desc">Newest to oldest</option>
        <option value="created_at,asc">Oldest to newest</option>
        <option value="comment_count,desc">Most commented</option>
        <option value="comment_count,asc">Least commented</option>
        <option value="votes,desc">Most votes</option>
        <option value="votes,asc">Least votes</option>
      </select>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by || prevState.order !== this.state.order) {
      const { sort_by, order } = this.state;
      this.props.updateSort(sort_by, order);
    }
  }

  handleSelectChange = e => {
    const data = e.target.value.split(',');
    const sort_by = data[0];
    const order = data[1];

    this.setState({ sort_by, order });
  };
}

export default ArticleSelect;
