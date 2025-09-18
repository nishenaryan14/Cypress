 describe('My First Cypress Test Suite', () => {
 it('should visit a website and check a title', () => {
 cy.visit('https://example.cypress.io');
 // Act: No specific action needed beyond visiting for this test, but you could add interactions here.
 // Assert: Verify the page title
 cy.title().should('eq', 'Cypress.io: Kitchen Sink');
 });
 });
