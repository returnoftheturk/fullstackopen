import { useState } from 'react'

const Blog = ({ blog, addLikeToBlog, removeBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false)

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
          <button onClick={() => removeBlog(blog)}>
            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default Blog
