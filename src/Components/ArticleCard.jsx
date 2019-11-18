import React from 'react'

const ArticleCard = props => {
  const { articles } = props

  return articles.map(article => {
    return (
      <li className='card' key={article.id}>
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
    )
  })
}

export default ArticleCard
