Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', ({ author, title, url }) => {
  return cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { author, title, url },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  }).then(response => {
    return response.body.id
  });
})

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  const user = {
    name,
    username,
    password,
  }
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  cy.visit('')
})

Cypress.Commands.add('resetDatabase', () => {
  cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  cy.visit('')
})
