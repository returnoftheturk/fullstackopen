import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../../src/components/Blog'

const blog = {
  author: 'Test Author',
  title: 'Test title',
  likes: 0,
  url: 'google.ca'
}

test('renders content', async () => {
  const { container } = render(
    <Blog blog={blog} />
  )

  // Renders the header
  const blogHeader = screen.getByText('Test title by Test Author')
  expect(blogHeader).toBeDefined()

  // Does not render the likes and URL by default
  const blogLikes = container.querySelector('.likes')
  expect(blogLikes).toBeNull()

  const blogUrl = container.querySelector('.url')
  expect(blogUrl).toBeNull()
})

test('renders likes and url when show button is clicked', async () => {
  const { container } = render(
    <Blog blog={blog} />
  )
  const user = userEvent.setup()

  // Renders the header
  const blogHeader = screen.getByText('Test title by Test Author')
  expect(blogHeader).toBeDefined()

  // Does not render the likes and URL by default
  let blogLikes = container.querySelector('.likes')
  expect(blogLikes).toBeNull()

  let blogUrl = container.querySelector('.url')
  expect(blogUrl).toBeNull()

  const button = screen.getByText('view')
  await user.click(button)

  blogLikes = container.querySelector('.likes')
  expect(blogLikes).toBeDefined()

  blogUrl = container.querySelector('.url')
  expect(blogUrl).toBeDefined()
})

test('clicking the "like" button twice calls the component event handler twice', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} addLikeToBlog={mockHandler}/>)

  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
  expect(mockHandler.mock.calls[0][0]).toEqual(blog)
})
