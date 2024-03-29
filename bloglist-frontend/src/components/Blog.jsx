import { useState } from 'react'

const Blog = ({ blog,user, addLikeToBlog, removeBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const isUserOwner = (user, blog) => {
    if(!user || !user.username || !blog || !blog.user) return false;
    return blog.user.username === user.username
  }

  return (
    <div className="blog">
      <span>
        {blog.title} by {blog.author}
      </span> &nbsp;
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'hide' : 'view'}
      </button>
      {isExpanded && (
        <div id={`expanded-blog-${blog.id}`}>
          <div className='url'><b>URL</b>: {blog.url}</div>
          <div className='likes'>
            <span>
              <b>Likes</b>: {blog.likes || 0}
            </span> &nbsp;
            <button 
              onClick={() => addLikeToBlog(blog)}
              id="like-button"
              >
              like
            </button>
          </div>
          <div><b>User</b>: {blog?.user?.name}</div>
          {isUserOwner(user, blog) &&
            <button
              onClick={() => removeBlog(blog)}
              id="delete-button"
              >
              Remove
            </button>
          }
        </div>
      )}
    </div>
  )
}

export default Blog
