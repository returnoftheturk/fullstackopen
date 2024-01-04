import _ from 'lodash';

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  const highestLikes = blogs.reduce((curMax, blog) => Math.max(curMax, blog.likes || 0), -Infinity);
  return blogs.find((blog) => blog.likes === highestLikes);
};

const mostBlogs = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author');
  const authorsByBlogs = _.mapValues(groupedByAuthor, (group) => group.length);

  const authorWithMostBlogs = _.maxBy(_.keys(authorsByBlogs), (author) => authorsByBlogs[author]);

  return {
    author: authorWithMostBlogs,
    blogs: authorsByBlogs[authorWithMostBlogs]
  };
};

const mostLikes = (blogs) => {
  const groupedByAuthor = _.groupBy(blogs, 'author');
  const authorsByLikes = _.mapValues(groupedByAuthor, totalLikes);

  const authorWithMostLikes = _.maxBy(_.keys(authorsByLikes), (author) => authorsByLikes[author]);

  return {
    author: authorWithMostLikes,
    likes: authorsByLikes[authorWithMostLikes]
  };
};

export {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};