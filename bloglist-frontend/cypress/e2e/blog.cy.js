describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#login-form')
      .contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
    
      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })

    describe.only('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })
  
      it('A blog can be created', function() {
        cy.contains('New Blog').click()
        cy.get('#author-input').type('Some Author')
        cy.get('#title-input').type('Some Title')
        cy.get('#url-input').type('Some URL')
        cy.contains('Add Blog').click()
        cy.contains('Some Title by Some Author')
      })

      describe('and a blog exists', function () {
        let newBlogId;
        beforeEach(function () {
          cy.createBlog({
            author: 'another Author',
            title: 'another title',
            url: 'another URL'
          }).then(blogId => {
            newBlogId = blogId
          })

          cy.visit('http://localhost:5174')
        })
  
        it('its likes can be updated', function () {
          console.log(newBlogId, 'new blog id')
          cy.contains('another title by another Author').parent().find('button').as('viewButton')
          cy.get('@viewButton')
            .click()
          
          cy.get(`#expanded-blog-${newBlogId}`)
            .contains('Likes: 0')
          
          cy.get(`#expanded-blog-${newBlogId}`)
            .find('#like-button').as('likeButton')

          cy.get('@likeButton')
            .click();
          
          cy.get(`#expanded-blog-${newBlogId}`)
            .contains('Likes: 1')
        })
      })
    })
  })
})