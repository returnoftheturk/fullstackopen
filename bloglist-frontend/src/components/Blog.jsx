import { useState } from 'react'

const Blog = ({ blog, addLikeToBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="blog">
      <span>
        {blog.title} by {blog.author}
      </span> &nbsp;
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'hide' : 'view'}
      </button>
      {isExpanded && (
        <div>
          <div><b>URL</b>: {blog.url}</div>
          <div>
            <span>
              <b>Likes</b>: {blog.likes || 0}
            </span> &nbsp;
            <button onClick={() => addLikeToBlog(blog)}>
              like
            </button>
          </div>
          <div><b>User</b>: {blog.user.name}</div>
        </div>
      )}
    </div>  
  )
}

export default Blog
