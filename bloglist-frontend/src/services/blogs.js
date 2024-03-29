import axios from 'axios'
const baseUrl = '/api/blogs'

const getConfig = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  const user = JSON.parse(loggedUserJSON)
  return {
    headers: { Authorization: `Bearer ${user.token}` },
  }
}

const getAll = async () => {
  const config = getConfig()
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newBlog) => {
  const config = getConfig()
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blogId, likes) => {
  const config = getConfig()
  const url = baseUrl + `/${blogId}`
  const response = await axios.put(url, { likes }, config)
  return response.data
}

const remove = async (blogId) => {
  const config = getConfig()
  const url = baseUrl + `/${blogId}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, create, update, remove }
