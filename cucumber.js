module.exports = {
  default: {

    paths: [
      'features/**/*.feature'
    ],
    requireModule: [
      'ts-node/register'
    ],
    require: [
      'src/steps/**/*.ts',
      'src/support/**/*.ts'
    ],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      snippetInterface: 'async-await',
      resultsDir: 'allure-results',
      labels: [
        {
          name: "severity",
          pattern: [/@severity:(.*)/]
        }
      ]
    },
    publishQuiet: true
  }
};
