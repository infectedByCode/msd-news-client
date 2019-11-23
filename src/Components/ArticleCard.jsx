import React from 'react'
import { Link } from '@reach/router'
import Timestamp from 'react-timestamp'
import Voter from './Voter'

const ArticleCard = props => {
  const { article, currentUser } = props

  return (
    <div className='card'>
      <Link to={`/articles/${article.id}`}>
        <li>
          <h2>
            <span>newsBits/</span>
            {article.topic}
          </h2>
          <h3>
            Posted by {article.author} on <Timestamp date={article.created_at} />
          </h3>
          <h4>
            {article.title}
          </h4>
          <p>
            Comments: {article.comment_count}
          </p>
        </li>
      </Link>
      <Voter votes={article.votes} currentUser={currentUser} author={article.author} article_id={article.id} />
    </div>
  )
}

export default ArticleCard
