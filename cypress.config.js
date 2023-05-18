const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  e2e: {
    specPattern: "./cypress/e2e/integration/**/*.feature",

    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber());
      // implement node event listeners here
    },
  },
});
