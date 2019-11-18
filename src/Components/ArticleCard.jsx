import React from 'react'
import { Link } from '@reach/router'

const ArticleCard = props => {
  const { articles } = props

  return articles.map(article => {
    return (
      <Link key={article.id} to={`/articles/${article.id}`}>
        <li className='card'>
          <h2>
            newsbits/{article.topic}
          </h2>
          <h3>
            {article.title}
          </h3>
          <h4>
            {article.author}
          </h4>
          <p>
            {article.comment_count}
          </p>
        </li>
      </Link>
    )
  })
}

export default ArticleCard
