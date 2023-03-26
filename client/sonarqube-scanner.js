const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "https://localhost:3000",
    login: "admin",
    password: "admin",
    options: {
      "sonar.sources": "./src",
    },
  },
  () => process.exit()
);
