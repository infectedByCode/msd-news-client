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

export const postArticle = async (titleInput, bodyInput, topicInput, user) => {
  const postRequestData = {
    author: user,
    title: titleInput,
    body: bodyInput,
    topic: topicInput
  }
  const { data } = await axios.post(`${baseUrl}/articles`, postRequestData)

  return data.article[0]
}

export const patchArticleById = async (id, vote) => {
  const { data } = await axios.patch(`${baseUrl}/articles/${id}`, { inc_votes: vote })

  return data.article
}

export const deleteArticleById = async id => {
  const data = await axios.delete(`${baseUrl}/articles/${id}`)

  return data.status
}

export const getCommentsByArticleId = async id => {
  const { data } = await axios.get(`${baseUrl}/articles/${id}/comments`)

  return data.comments
}

export const postCommentByArticleId = async (id, body, username) => {
  const { data } = await axios.post(`${baseUrl}/articles/${id}/comments`, { username, body })

  return data.comment
}

export const deleteCommentById = async id => {
  const data = await axios.delete(`${baseUrl}/comments/${id}`)

  return data.status
}

export const patchCommentById = async (id, vote) => {
  const { data } = await axios.patch(`${baseUrl}/comments/${id}`, { inc_votes: vote })

  return data.comment
}

export const getTopics = async () => {
  const { data } = await axios.get(`${baseUrl}/topics`)
  return data.topics
}
