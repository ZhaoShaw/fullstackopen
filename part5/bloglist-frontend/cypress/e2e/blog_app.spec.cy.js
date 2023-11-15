describe('Blog APP', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3107/api/testing/reset')
    const user1 = {
      username: 'Alex',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3107/api/users', user1)
    const user2 = {
      username: 'Petty',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3107/api/users', user2)
    cy.visit('http://localhost:5173')
  })
  it('Login form is shown', () => {
    cy.contains('blogs')
  })

  describe('Login', () => {
    it('user can login', () => {
      cy.contains('login in').click()
      cy.get('#username').type('Alex')
      cy.get('#password').type('123456')
      cy.get('#login-button').click()
      cy.contains('Alex logged in')
    })

    it('user fails with wrong password', () => {
      cy.contains('login in').click()
      cy.get('#username').type('Alex')
      cy.get('#password').type('12356')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(function() {
      cy.login({ username: 'Alex', password: '123456' })
    })
    it('A blog can be created', () => {
      cy.contains('new blog').click()
      cy.get('#new-blog-title').type('Tea')
      cy.get('#new-blog-author').type('tim')
      cy.get('#new-blog-url').type('868689')
      cy.get('#new-blog-create').click()

      cy.contains('a new blog Tea by tim added!')
    })

    describe('and a blog exists', () => {
      beforeEach(function() {
        cy.createBlog({
          title: 'Tea',
          author: 'tim',
          blogUrl: '868689'
        })
      })
      it('a blog can be liked', () => {
        cy.contains('Tea').parent().find('button').first().click()
        cy.get('#like-button').click()
        cy.contains('likes: 1')
      })
      it('a blog can be delete by creator', () => {
        cy.contains('Tea').parent().find('button').first().click()
        cy.get('#remove-button').click()
      })

      describe('a blog can not be delete', () => {
        beforeEach(function() {
          cy.contains('logout').click()
          cy.login({ username: 'Petty', password: '123456' })
        })
        it('no delete', () => {
          cy.contains('Tea').parent().find('button').first().click()
          cy.contains('remove').should('not.exist')
        })
      })
    })

    describe('blog sort', () => {
      beforeEach(function() {
        cy.createBlog({
          title: 'Tea',
          author: 'tim',
          blogUrl: '868689'
        })
        cy.createBlog({
          title: 'PPT',
          author: 'tim',
          blogUrl: '868689'
        })
        cy.get('#blog-list > :nth-child(1)')
          .find('button').first().click()
        cy.get('#blog-list > :nth-child(2)')
          .find('button').first().click()
      })
      it.only('most likes first', () => {
        cy.get('#blog-list > :nth-child(2)')
          .find('button')
          .eq(1)
          .click()
        cy.wait(5000)
        cy.get('#blog-list > :nth-child(1)')
          .contains('PPT')
      })
    })
  })
})
