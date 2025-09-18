require('cypress-xpath');

describe('Cypress Core Commands', () => {
  before(() => {
    cy.log('Starting Cypress Core Commands Test Suite');
  });
  
  beforeEach(() => {
    cy.intercept('GET', /doubleclick\.net|googlesyndication\.com|google-analytics\.com|googletag(manager|services)\.com|recaptcha/i, {
      statusCode: 204,
      body: '',
      headers: { 'access-control-allow-origin': '*' },
    }).as('blockedThirdParty');

    // Ignore any stray cross-origin script errors
    cy.on('uncaught:exception', (err) => {
      if (err && err.message && err.message.includes('Script error')) {
        return false;
      }
    });
  });

  after(() => {
    cy.log('Completed the Core Commands Test Suite');
  });

  it('Test 1: SauceDemo - Login, Navigation, and Product Interaction', function () {
    cy.visit('https://www.saucedemo.com/');
    cy.wait(5000)
    // Login
    cy.get('[data-test="username"]').clear().type('standard_user').should('have.value', 'standard_user');
    cy.get('[data-test="password"]').clear().type('secret_sauce');
    cy.wait(500);
    cy.get('[data-test="login-button"]').click();
    cy.wait(1000);

    // Navigation and Control
    cy.log('Checking Navigation and Control');
    cy.get('.shopping_cart_link').click();
    cy.screenshot('cart page');
    cy.wait(1000);
    cy.go('back');
    cy.wait(1000);
    cy.viewport(1200, 800);
    cy.viewport(800, 500);

    // Querying and Finding Elements
    cy.log('Querying and Finding Elements');
    cy.get('.bm-menu-wrap').should('exist');
    cy.xpath('//*[@id="item_4_title_link"]/div').contains('Sauce Labs');
    cy.get('#item_4_title_link').find('.inventory_item_name');
    cy.get('[data-test="inventory-item-name"]').first();
    cy.get('[data-test="inventory-item-name"]').last();

    // User Actions
    cy.log('Checking User Actions');
    cy.get('.product_sort_container').select('Price (low to high)');
    cy.xpath('//*[@id="item_1_title_link"]/div').trigger('mouseover');

    // Network Request with Fixture
    cy.log('Intercepting Network Request with Fixture');
    cy.fixture('postData.json').then((mockData) => {
      cy.intercept('GET', 'https://dummyjson.com/posts/1', {
        statusCode: 200,
        body: mockData
      }).as('mockedPost');
    });

    // Command Chaining and Aliasing
    cy.log('Command Chaining and Control Flow');
    cy.xpath('//*[@id="item_4_title_link"]/div').then(($element) => {
      const productName = $element.text();
      cy.log('Product name is: ' + productName);
      expect(productName).to.contain('Sauce Labs Backpack');

      cy.xpath('//*[@id="item_4_title_link"]/div').as('productItem');
      cy.get('@productItem').should('be.visible');
    });

    // Scoped Queries with .within()
    cy.get('#item_4_title_link').within(() => {
      cy.get('.inventory_item_name').should('contain.text', 'Sauce Labs Backpack');
    });
  });

  it('Test 2: DemoQA - Form Interaction', function () {
    cy.visit('https://demoqa.com/automation-practice-form');

    cy.wait(4000);
    cy.get('#gender-radio-1').check({ force: true });
    cy.wait(800);
    cy.get('#gender-radio-2').check({ force: true });
    cy.wait(1000);
  });
});
