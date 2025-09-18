describe('SauceDemo Login with Fixture', () => {
 it('should login using fixture data', () => {
    let url = 'https://www.saucedemo.com/'
    cy.visit(url);
    

    cy.fixture('userSauce').then((userData) => {
    cy.loginSauce(userData.username,userData.password,url);
    // cy.get('[data-test="username"]').type(userData.username);

    
    // cy.get('[data-test="password"]').type(userData.password);
    
    // });
    
    // cy.get('[data-test="login-button"]').click();
    // Verify successful login
    cy.url().should('include', '/inventory.html');
 } )
});
});