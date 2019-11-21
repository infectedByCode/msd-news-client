import React, { Component } from 'react';
import * as api from '../api';
import { Alert } from 'react-bootstrap';
import ArticleCard from './ArticleCard';
import ArticleSelect from './ArticleSelect';
import ArticleForm from './ArticleForm';
import ErrorPage from './ErrorPage';
 
class ArticleList extends Component {
  state = {
    articleData: [],
    sort_by: 'created_at',
    order: 'desc',
    scrollCount: 5,
    limit:5,
    contScroll: true,
    isLoading: true,
    isScrollLoading: false,
    error: null
  };

  render() {
    const { articleData, isLoading, error, contScroll, isScrollLoading } = this.state;
    const { currentUser, loggedIn, author} = this.props;

    if (isLoading) {
      return (
        <img
          id="loadingGif"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
          alt="loading page"
          />
      );
    }
    if (error) return <ErrorPage error={error} />;

    return (
      <main>
        <div id="article-sub-menu">
          {this.props.topic
            ? <h2>
                newsbits/{this.props.topic}
              </h2>
            : <h2>Articles</h2>}
          {loggedIn && !author && <><h3>Post a new article</h3><ArticleForm currentUser={currentUser} renderNewArticle={this.renderNewArticle} /></>}
          {!loggedIn && <Alert variant="danger">Login to post new articles and vote!</Alert>}
          <ArticleSelect updateSort={this.updateSort} />
        </div>
        <ul className="list" onScroll={()=>{console.log('heeeyyyy')}}>
          {articleData.map(article => {
            return <ArticleCard article={article} key={article.id} className="article-card" currentUser={currentUser}/>;
          })}
        </ul>
        {isScrollLoading && <img
          id="loadingGif"
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
          alt="loading page"
        />}
        {!contScroll && <Alert variant='danger'>No more articles to display</Alert>}
      </main>
    );
  }

  componentDidMount() {
    this.fetchArticleData();
    window.addEventListener('scroll', this.handleScroll);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      prevState.sort_by !== this.state.sort_by ||
      prevState.order !== this.state.order || prevState.scrollCount !== this.state.scrollCount
      ) {
      this.fetchArticleData();
    }
  }
    
  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const {limit, contScroll} = this.state;

    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && contScroll) {
      this.setState(currentState => {
        return {scrollCount: currentState.scrollCount + limit, isScrollLoading: true};
      })
    }
  }
  
  fetchArticleData = () => {
    const { topic, author } = this.props;
    const { sort_by, order, scrollCount } = this.state;

    api
      .getArticles(topic, sort_by, order, author, scrollCount)
      .then(({articles, article_count}) => {
        if (article_count < scrollCount ) this.setState({ articleData: articles, isLoading: false, contScroll: false, isScrollLoading: false })
        else this.setState({ articleData: articles, isLoading: false, isScrollLoading: false})
      })
      .catch(error => {
        const { status, statusText } = error.response;
        this.setState({ error: { status, msg: statusText }, isLoading: false });
      });
  };

  renderNewArticle = article => {
    this.setState(currentState => {
      return { articleData: [article, ...currentState.articleData] };
    });
  };

  toggleForm = () => {
    this.setState(currentState => {
      return { showForm: !currentState.showForm };
    });
  };

  updateSort = (sort_by, order) => {
    this.setState({ sort_by, order });
  };
}

export default ArticleList;
