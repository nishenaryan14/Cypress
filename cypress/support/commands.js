Cypress.Commands.add('login',(username,password,url)=>{
    cy.visit(url);
    cy.wait(800)
    cy.screenshot('login')
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()

})

Cypress.Commands.add('loginSauce',(username,password,url)=>{
    cy.visit(url);
    cy.get('[data-test="username"]').type(username)
    cy.get('[data-test="password"]').type(password)
    cy.get('[data-test="login-button"]').click()
    cy.wait(1000);
})

Cypress.Commands.add('getSafely', (selector, timeout = 10000) => {
    return cy.get(selector, { timeout: timeout }).should('exist');
});
// Custom command for login with error handling
Cypress.Commands.add('loginSafely', (username, password) => {
    cy.visit('/web/index.php/auth/login');
    cy.getSafely('input[name="username"]').type(username);
    cy.getSafely('input[name="password"]').type(password);
    cy.getSafely('button[type="submit"]').click();
    // Handle both success and failure cases
    cy.url().then((url) => {
        if (url.includes('/auth/login')) {
            throw new Error('Login failed - check credentials');
        }
    });
});