require("chromedriver");
const { By } = require("selenium-webdriver");
const { expect } = require("chai");
const { Before, Given, When, Then, After } = require("@cucumber/cucumber");
const { initDriver } = require("../../conf/initDriver");

let driver;

Before(async () => {
  driver = initDriver();
});

Given("I am on the login page", async () => {
  await driver.get("http://localhost:3000/login");
});

After(async () => {
  await driver.close();
  await driver.quit();
});

When(
  "I enter my valid credentials {string} and {string}",
  async (username, password) => {
    await driver.findElement(By.id("email")).sendKeys(username);
    await driver.findElement(By.id("password")).sendKeys(password);
  }
);

When("I click the login button", async () => {
  await driver.findElement(By.id("submit")).click();
});

Then("I should be redirected to the profile page", async () => {
  const url = await driver.getCurrentUrl();
  expect(url).to.equal("http://localhost:3000/profile");
});

Then("I should see the navigation bar", async () => {
  const nav_bar = await driver.findElement(By.id("navigation_bar")).getText();
  expect(nav_bar)
    .to.contain("Home")
    .and.to.contain("All Jobs")
    .and.to.contain("Add Jobs")
    .and.to.contain("View My Jobs")
    .and.to.contain("Settings");
});
