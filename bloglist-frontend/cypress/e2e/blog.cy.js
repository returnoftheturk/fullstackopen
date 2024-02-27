describe('Blog app', function() {
  beforeEach(function() {
    cy.resetDatabase();
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.createUser(user)

    const user2 = {
      name: 'Matti Luukkainen 2',
      username: 'mluukkai2',
      password: 'salainen2'
    }
    cy.createUser(user2)
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

    describe('When logged in', function() {
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

          cy.visit('')
        })
  
        it('its likes can be updated', function () {
          cy.contains('another title by another Author').parent().find('button').as('viewButton')
          cy.get('@viewButton')
            .click()
          
          cy.get(`#expanded-blog-${newBlogId}`)
            .contains('Likes: 0')
          
          cy.get(`#expanded-blog-${newBlogId}`)
            .find('#like-button')
            .click();
          
          cy.get(`#expanded-blog-${newBlogId}`)
            .contains('Likes: 1')
        })

        it('user who created a blog can delete it', function () {
          cy.contains('another title by another Author').parent().find('button').as('viewButton')
          cy.get('@viewButton')
            .click()
          
          cy.on('window:confirm', () => true);
          cy.get(`#expanded-blog-${newBlogId}`)
            .find('#delete-button')
            .click();
          
          cy.contains('another title by another Author').should('not.exist')
        })

        it('only the creator can see the delete button of a blog', function () {
          cy.contains('another title by another Author').parent().find('button').as('viewButton')
          cy.get('@viewButton')
            .click()

          cy.on('window:confirm', () => true);
          cy.get(`#expanded-blog-${newBlogId}`)
            .find('#delete-button')

          cy.contains('Logout').click()
          cy.login({username: 'mluukkai2', password: 'salainen2'})
          cy.get('@viewButton')
            .click()

          cy.get(`#expanded-blog-${newBlogId}`)
            .find('#delete-button')
            .should('not.exist')
        })
      })

      const addLikesToBlog = (blogId, numLikes) => {
        cy.get(`#expanded-blog-${blogId}`)
          .find('#like-button')
          .as('likeButton')
        for(let i = 0; i < numLikes; i++) {
          cy.get('@likeButton')
            .click();
          
          cy.get(`#expanded-blog-${blogId}`)
            .contains(`Likes: ${i + 1}`)
        }
      }

      it('blogs are ordered by likes, with the most liked blog being first', function () {
        let blog1Id;
        let blog2Id;
      
        // Create both blogs concurrently
        const createBlogPromises = [
          cy.createBlog({
            author: 'B Bauther',
            title: 'Blog 1 title',
            url: 'another URL'
          }),
          cy.createBlog({
            author: 'A Author',
            title: 'Blog 2 title',
            url: 'some URL'
          })
        ];
      
        // Resolve promises and assign blogIds
        Promise.all(createBlogPromises).then(([blogId1, blogId2]) => {
          blog1Id = blogId1;
          blog2Id = blogId2;
      
          cy.visit('')
          cy.contains('Blog 1 title by B Bauther')
            .parent()
            .find('button')
            .click();
  
          cy.contains('Blog 2 title by A Author')
            .parent()
            .find('button')
            .click();

          addLikesToBlog(blog1Id, 5);
          cy.get('.blog').eq(0).should('contain', 'Blog 1 title by B Bauther');
  
          addLikesToBlog(blog2Id, 6);
          cy.get('.blog').eq(0).should('contain', 'Blog 2 title by A Author');
        });
      });
      
    })
  })
})