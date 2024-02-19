import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ author: '', title: '', url: '' })

  const handleBlogChange = (e) => {
    const { name, value } = e.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const addBlog = (e) => {
    e.preventDefault()
    createBlog(newBlog, (err) => {
      if(!err) {
        setNewBlog({ author: '', title: '', url: '' })
      }
    })
  }

  return (
    <form onSubmit={addBlog}>
      <table>
        <tbody>
          <tr>
            <td align="right">Author:</td>
            <td align="left">
              <input
                type="text"
                name="author"
                value={newBlog.author}
                onChange={handleBlogChange}
                id="author-input"
              />
            </td>
          </tr>
          <tr>
            <td align="right">Title:</td>
            <td align="left">
              <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleBlogChange}
                id="title-input"
              />
            </td>
          </tr>
          <tr>
            <td align="right">URL:</td>
            <td align="left">
              <input
                type="text"
                name="url"
                value={newBlog.url}
                onChange={handleBlogChange}
                id="url-input"
              />
            </td>
          </tr>
          <tr>
            <td align="right"><button type="submit">Add Blog</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

export default BlogForm
