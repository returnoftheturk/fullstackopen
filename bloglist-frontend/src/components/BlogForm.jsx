export default ({addBlog, newBlog, handleBlogChange}) => (
  <form onSubmit={addBlog}>
    <div>
      <label>
        Author:
        <input type="text" name="author" value={newBlog.author} onChange={handleBlogChange} />
      </label>
    </div>
    <div>
      <label>
        Title:
        <input type="text" name="title" value={newBlog.title} onChange={handleBlogChange} />
      </label>
    </div>
    <div>
      <label>
        URL:
        <input type="text" name="url" value={newBlog.url} onChange={handleBlogChange} />
      </label>
    </div>
    <button type="submit">Add Blog</button>
  </form>
)