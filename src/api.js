import axios from 'axios'

const baseUrl = 'https://msd-news.herokuapp.com/api'

export const getArticles = async topic => {
  const { data } = await axios.get(`${baseUrl}/articles`, { params: { topic } })
  return data.articles
}

export const getArticleById = async id => {
  const { data } = await axios.get(`${baseUrl}/articles/${id}`)

  return data.article
}

export const getCommentsByArticleId = async id => {
  const { data } = await axios.get(`${baseUrl}/articles/${id}/comments`)

  return data.comments
}

export const getTopics = async () => {
  const { data } = await axios.get(`${baseUrl}/topics`)
  return data.topics
}
