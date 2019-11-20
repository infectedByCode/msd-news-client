import React from 'react'
import { Link } from '@reach/router'
import Timestamp from 'react-timestamp'
import Voter from './Voter'

const ArticleCard = props => {
  const { article } = props

  return (
    <div className='card' id='article-list'>
      <Link to={`/articles/${article.id}`}>
        <li>
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
        </li>
      </Link>
      <Voter votes={article.votes} />
    </div>
  )
}

export default ArticleCard
