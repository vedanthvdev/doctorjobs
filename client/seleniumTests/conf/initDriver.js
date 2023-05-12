const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

exports.initDriver = () => {
  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().addArguments("--start-maximized"))
    .build();
  driver.manage().setTimeouts({ implicit: 5000 });
  return driver;
};
