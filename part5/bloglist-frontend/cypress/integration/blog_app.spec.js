describe('Blog app', function() {
  before(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Tim Apple',
      username: 'timapple',
      password: 'hello'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('login')
    cy.get('#loginButton').click()
  })
})

describe('Login and logout',function() {
  it('user can log in successfully with correct credentials', function() {
    cy.get('#username').type('timapple')
    cy.get('#password').type('hello')
    cy.get('#loginFormButton').click()
    cy.get('#logoutButton').click()
  })

  it('fails with wrong credentials', function() {
    cy.contains('login')
    cy.get('#loginButton').click()
    cy.get('#username').type('chocolatemilk')
    cy.get('#password').type('hello123')
    cy.get('#loginFormButton').click()
    cy.get('#cancelLoginButton').click()
  })
 
})

describe('When logged in', function() {
  it('user can log in successfully with correct credentials', function() {
    //cy.wait(5000)
    cy.get('#loginButton').click()
    cy.get('#username').type('timapple')
    cy.get('#password').type('hello')
    cy.get('#loginFormButton').click()
  })

  it('a blog can be created', function() {
    cy.get('#newBlogButton').click()
    cy.get('#blogFormTitle').type('Cypress Testing is awesome')
    cy.get('#blogFormAuthor').type('timapple')
    cy.get('#blogFormUrl').type('cypress.io')
    cy.get('#submitNewBlog').click()
    cy.get('.viewMoreButton').click()
    cy.get('.likeBlogButton').click()
  })

  it('a blog can be created', function() {
    cy.get('#blogFormTitle').type('Chocolatemilk is the best')
    cy.get('#blogFormAuthor').type('timapple')
    cy.get('#blogFormUrl').type('cypress.io/213')
    cy.get('#submitNewBlog').click()
  })

  it('a blog can be created', function() {
    cy.get('#blogFormTitle').type('Test title')
    cy.get('#blogFormAuthor').type('Tester')
    cy.get('#blogFormUrl').type('test.io')
    cy.get('#submitNewBlog').click()
  })


  it('a blog can be liked', function() {
    cy.get('.viewMoreButton').click({ multiple: true })
    cy.get('.likeBlogButton').click({ multiple: true })
    cy.get('.likeBlogButton').click({ multiple: true })
    cy.get('.likeBlogButton').click({ multiple: true })
    cy.get('.viewMoreButton').last()
    cy.contains('view').click()
  })

  it('delete a blog', function() {
    cy.get('.removeBlogButton').first()
    cy.contains('remove').click()
  })

  it('sorts by ascending order', function() {
    cy.get('.likeBlogButton').last().click()
    cy.get('.likeBlogButton').last().click()
    cy.get('.likeBlogButton').last().click()
    cy.get('.likeBlogButton').last().click()
  })
})
