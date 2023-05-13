const cucumber_theme =
  "--format @cucumber/pretty-formatter " +
  "--format-options '{\"colorsEnabled\": true}' " +
  '--format-options \'{"theme": {"feature keyword":["bold","blue"],"tag":["yellow"],"feature name":["blue","underline"],"feature description":["blueBright"],"scenario keyword":["bold","magenta"],"scenario name":["magenta","underline"],"step keyword":["bold","green"],"step text":["greenBright","italic"]}}\'';

let cucumberOptions = [
  cucumber_theme,
  "--require ./seleniumTests/steps/**/*.js",
  "--tags '@run_all'",
  "./seleniumTests/features/**/*.feature",
  "--require cucumber-parallel",
  "--publish-quiet",
  "--parallel 3",
].join(" ");

module.exports = { default: cucumberOptions };
