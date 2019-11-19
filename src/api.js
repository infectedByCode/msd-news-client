import axios from 'axios'

const baseUrl = 'https://msd-news.herokuapp.com/api'

export const getArticles = async (topic, sort_by, order) => {
  const { data } = await axios.get(`${baseUrl}/articles`, { params: { topic, sort_by, order } })
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

export const postCommentByArticleId = async (id, body, username) => {
  const { data } = await axios.post(`${baseUrl}/articles/${id}/comments`, { username, body })

  return data.comment
}

export const deleteCommentByArticleId = async id => {
  const data = await axios.delete(`${baseUrl}/comments/${id}`)

  return data.status
}

export const getTopics = async () => {
  const { data } = await axios.get(`${baseUrl}/topics`)
  return data.topics
}
