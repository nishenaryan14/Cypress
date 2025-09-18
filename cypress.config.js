const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    defaultCommandTimeout: 10000,
    screenshotOnRunFailure: true, // Auto-screenshot on test failure
    screenshotsFolder: 'cypress/screenshots', 
    setupNodeEvents(on, config) {
      // Enable logging to terminal using cy.task('log', ...)
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    }
  },
  // Reporter configuration
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'OrangeHRM Test Report',
    inlineAssets: true,
  },

});
