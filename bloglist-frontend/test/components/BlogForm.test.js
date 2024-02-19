import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from '../../src/components/BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const mockData = {
    author: 'Some Author Name',
    title: 'Some Title',
    url: 'google.ca'
  }

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const authorInput = container.querySelector('#author-input')
  const titleInput = container.querySelector('#title-input')
  const urlInput = container.querySelector('#url-input')
  const addBlogButton = screen.getByText('Add Blog')

  await user.type(authorInput, mockData.author)
  await user.type(titleInput, mockData.title)
  await user.type(urlInput, mockData.url)

  await user.click(addBlogButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(mockData)
})