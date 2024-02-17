export default ({addBlog, newBlog, handleBlogChange}) => (
  <form onSubmit={addBlog}>

    <table>
      <tbody>
        <tr>
          <td align="right">Author:</td>
          <td align="left"><input type="text" name="author" value={newBlog.author} onChange={handleBlogChange} /></td>
        </tr>
        <tr>
          <td align="right">Title:</td>
          <td align="left"><input type="text" name="title" value={newBlog.title} onChange={handleBlogChange} /></td>
        </tr>
        <tr>
          <td align="right">URL:</td>
          <td align="left"><input type="text" name="url" value={newBlog.url} onChange={handleBlogChange} /></td>
        </tr>
        <tr>
          <td align="right"><button type="submit">Add Blog</button></td>
        </tr>
      </tbody>
    </table>
  </form>
)