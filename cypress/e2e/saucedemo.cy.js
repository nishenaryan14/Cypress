require('cypress-xpath');

describe('Sauce Demo Spec', () => {
  // Runs once before all tests in the block
  before(() => {
    cy.log('Starting Sauce Demo Test Suite');
  });

  // Runs before each test in the block
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/'); //(navigation and control)
    cy.wait(1000); // Wait after page load
    cy.reload();
    cy.wait(1000);
  });

  // Runs after all tests in the block
  after(() => {
    cy.log('Completed Sauce Demo Test Suite');
  });

  it('saucedemo', function () {
    // Login
    cy.wait(800);
    cy.screenshot('login') //respective script line to capture the screenshot named login.png
    cy.get('[data-test="username"]').clear().type('standard_user').should('have.value', 'standard_user');
    cy.get('[data-test="password"]').clear().type('secret_sauce');
    cy.wait(500); // Wait before clicking login
    cy.get('[data-test="login-button"]').click();
    cy.wait(1000); // Wait for inventory page to load
    // Verify item exists
    cy.get('#add-to-cart-sauce-labs-backpack').should('exist');
    cy.wait(500);

    // Burger menu visibility toggle
    cy.get('.bm-menu-wrap').should('exist');
    cy.get('.bm-menu-wrap').should('not.be.visible');
    cy.wait(500);
    cy.get('.bm-burger-button').click();
    cy.wait(500);
    cy.get('.bm-menu-wrap').should('be.visible');

    // Text content checks
    cy.get('.app_logo').should('have.text', 'Swag Labs');
    cy.xpath('//*[@id="item_4_title_link"]/div').should('include.text', 'Sauce Labs');
    cy.get('.app_logo').should('not.have.text', 'Swag Labs Backpack');
    cy.xpath('//*[@id="item_0_title_link"]/div').should('contain', 'Bike Light');
    cy.xpath('//*[@id="inventory_container"]/div/div[2]/div[2]/div[2]/div')
      .invoke('text')
      .should('match', /^\$\d+\.\d{2}$/); // Regex check for price format

    // Attribute checks
    cy.get('#item_4_title_link').should('have.attr', 'href', '#');
    cy.get('#item_4_title_link').should('not.have.attr', 'target');

    // CSS class checks
    cy.get('[data-test="inventory-container"]').should('have.class', 'inventory_container');
    cy.get('[data-test="inventory-container"]').should('not.have.class', 'inactive');

    // Length checks 
    cy.get('.app_logo').should('have.length', 1); 
    cy.get('.app_logo').should('have.length.greaterThan', 0);

    // Chained assertions
    cy.get('#add-to-cart-sauce-labs-backpack')
    .should('be.visible')
    .and('have.text', 'Add to cart')
    .and('not.have.class', 'disabled')
    .click();

    //clicking on the cart icon (navigation and control)
    cy.get('.shopping_cart_badge').click();
    cy.go('back');
    cy.wait(1000);
    cy.viewport(1200,800);
    cy.viewport(800,500);


    // Asserting against a function
    cy.get('.inventory_item_name').should(($list) => {
      console.log($list.length);
      expect($list).to.have.length(6);
      expect($list.first()).to.contain('Sauce Labs Backpack');
    });

    // URL checks
    cy.url().should('include', '/inventory.html');
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
  });
});
