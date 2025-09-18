describe('Orange HRM login',()=>{
    it('should login with custom command', () => {
    cy.login('Admin', 'admin123','https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.url().should('include', '/dashboard');
 })
//login is a custom method made under support/commands.js ----
// Cypress.Commands.add('login',(username,password,url)=>{
//     cy.visit(url);
//     cy.wait(800)
//     cy.screenshot('login')
//     cy.get('input[name="username"]').type(username)
//     cy.get('input[name="password"]').type(password)
//     cy.get('button[type="submit"]').click()

// })
})