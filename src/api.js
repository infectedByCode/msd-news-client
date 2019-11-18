import axios from 'axios'

const baseUrl = 'https://msd-news.herokuapp.com/api'

export const getArticles = async topic => {
  const { data } = await axios.get(`${baseUrl}/articles`, { params: { topic } })
  return data.articles
}

export const getTopics = async () => {
  const { data } = await axios.get(`${baseUrl}/topics`)
  return data.topics
}
