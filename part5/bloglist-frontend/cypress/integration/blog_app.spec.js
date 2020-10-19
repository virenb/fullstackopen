describe('Blog app', function() {
  beforeEach(function() {
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
    cy.get('#blogFormAuthor').type('bob123')
    cy.get('#blogFormUrl').type('cypress.io')
    cy.get('#submitNewBlog').click()
  })
})