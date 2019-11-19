import React from 'react'
import { Link } from '@reach/router'
import Timestamp from 'react-timestamp'

const ArticleCard = props => {
  const { article } = props

  return (
    <Link to={`/articles/${article.id}`}>
      <li className='card' id='article-list'>
        <h2>
          <span>newsBits/</span>
          {article.topic}
        </h2>
        <h3>
          Posted by newsBiter/{article.author} <Timestamp relative date={article.created_at} relativeTo={Date} />
        </h3>
        <h4>
          {article.title}
        </h4>
        <p>
          comments: {article.comment_count}
        </p>
        <p>
          votes: {article.votes}
        </p>
      </li>
    </Link>
  )
}

export default ArticleCard
