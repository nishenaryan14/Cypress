describe('Sauce Demo login',()=>{
    it('should login with custom command', () => {
    cy.loginSauce('standard_user', 'secret_sauce','https://www.saucedemo.com/');
    cy.url().should('include', '/inventory.html');
 })

})