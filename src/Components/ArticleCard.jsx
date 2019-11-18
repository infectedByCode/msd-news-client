import React from 'react'
import { Link } from '@reach/router'

const ArticleCard = props => {
  const { article } = props

  return (
    <Link to={`/articles/${article.id}`}>
      <li className='card'>
        <h2>
          newsbits/{article.topic}
        </h2>
        <h3>
          {article.title}
        </h3>
        <h4>
          author: {article.author}
        </h4>
        <p>
          comments: {article.comment_count}
        </p>
      </li>
    </Link>
  )
}

export default ArticleCard
