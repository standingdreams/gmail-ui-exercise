describe('Email List', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('deletes an email', () => {
    cy.get('.emailList__item')
      .first()
      .find('.emailList__nav').invoke('show')
      .find('.emailList__navBtn--trash')
      .click()
      .get('.emailList__item')
      .should('have.length', 9)
  })

  it('stars an email', () => {
    cy.get('.emailList__item')
      .first()
      .find('.emailList__star')
      .click()
      .get('.c-sidebar__nav')
      .find('.c-sidebar__navItem--starred')
      .find('span').contains('1')
  })
})