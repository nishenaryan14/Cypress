describe('OrangeHRM Error Handling Examples', () => {
it('handles element not found gracefully', () => {
cy.visit('/web/index.php/auth/login');
// Check if element exists before interacting
cy.get('input[name="username"]').should('exist').type('Admin');
cy.get('input[name="password"]').should('exist').type('admin123');
// Handle login with potential errors
cy.get('button[type="submit"]').click();
// Check URL to determine if login was successful
cy.url().then((url) => {
if (url.includes('/auth/login')) {
// Login failed - check for error message
cy.get('.oxd-alert-content')
.should('exist')
.then(($error) => {
cy.log('Login failed with error: ' + $error.text());
cy.screenshot('login-error');
});
} else {
// Login successful
cy.url().should('include', '/dashboard');
}
});
})
it('handles network errors gracefully', () => {
// Intercept API calls and handle errors
cy.intercept('GET', '**/api/**').as('apiCall');
cy.visit('/web/index.php/auth/login');
cy.get('input[name="username"]').type('Admin');
cy.get('input[name="password"]').type('admin123');
cy.get('button[type="submit"]').click();
// Wait for API call and handle potential failure
cy.wait('@apiCall').then((interception) => {
if (interception.response.statusCode >= 400) {
cy.log('API call failed: ' + interception.response.statusCode);
cy.screenshot('api-failure');
}
});
});
});
