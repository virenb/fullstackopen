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


describe('Login',function() {
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
  })
})