describe('OrangeHRM Data-Driven Login Tests', () => {
  const testCases = [
    {
      username: 'Admin',
      password: 'admin123',
      expected: 'success',
      description: 'Valid credentials'
    },
    {
      username: 'InvalidUser',
      password: 'wrongpassword',
      expected: 'failure',
      description: 'Invalid credentials'
    },
    {
      username: '',
      password: 'admin123',
      expected: 'failure',
      description: 'Empty username'
    },
    {
      username: 'Admin',
      password: '',
      expected: 'failure',
      description: 'Empty password'
    }
  ];

  testCases.forEach((testCase) => {
    it(`should handle login for: ${testCase.description}`, () => {
      cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

      // Wait for page to load completely
      cy.get('input[name="username"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');

      // Ensure fields are clean
      cy.get('input[name="username"]').clear();
      cy.get('input[name="password"]').clear();

      // Type username if not empty
      if (testCase.username !== '') {
        cy.get('input[name="username"]').type(testCase.username);
      }

      // Type password if not empty
      if (testCase.password !== '') {
        cy.get('input[name="password"]').type(testCase.password);
      }

      // Click login button
      cy.get('button[type="submit"]').click();

      // Verify expected outcome
      if (testCase.expected === 'success') {
        // Should be redirected to dashboard
        cy.url().should('include', '/dashboard');
        cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
        cy.get('.oxd-userdropdown-tab').should('be.visible');
      } else if (testCase.username === '' || testCase.password === '') {
        // Required validation for empty fields
        cy.get('.oxd-input-field-error-message')
          .should('be.visible')
          .and('contain.text', 'Required');

        // Should remain on login page
        cy.url().should('include', '/auth/login');
      } else {
        // Invalid credentials message
        cy.get('.oxd-alert-content-text')
          .should('be.visible')
          .and('contain.text', 'Invalid credentials');

        // Should remain on login page
        cy.url().should('include', '/auth/login');
      }
    });
  });
});
