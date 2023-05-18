const { Given, When, Then } = require("cypress-cucumber-preprocessor/steps");

Given("the user is on home page", async () => {
  await cy.visit("http://localhost:3000/");
});

When("the user clicks the login button", async () => {
  await cy.get("#login-link").click();
});

When("the user is on the login page", async () => {
  await cy.get("#forgot-password").contains("Forgotten Password");
});

When("the user enters {string} and {string}", async (username, password) => {
  await cy.get("#email").type(username);
  await cy.get("#password").type(password);
});

When("the user clicks submit", async () => {
  await cy.get("#submit").click();
});

Then("the user should see the navigation bar", async () => {
  await cy.get(".navigation_bar").contains("Home");
  await cy.get(".navigation_bar").contains("All Jobs");
  await cy.get(".navigation_bar").contains("Add Jobs");
  await cy.get(".navigation_bar").contains("View My Jobs");
  await cy.get(".navigation_bar").contains("Settings");
});

Then("the user selects settings tab", async () => {
  await cy.contains("Settings").click();
});

Then("the user logs out", async () => {
  cy.wait(5000);
  await cy.contains("Log Out").click();
});
