const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 30000,
  failOnStatusCode: false,
  screenshotOnRunFailure: true,
  video: false,
  screenshotsFolder: "cypress/reports/screenshots",
  experimentalWebKitSupport: true,
  e2e: {
    specPattern: "./cypress/e2e/integration/**/*.feature",

    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      // implement node event listeners here
    },
  },
});
