describe('Main Page', () => {
  it('worked', () => {
    cy.viewport(412, 847)
    cy.visit('http://localhost:3001')
  })
})
