module.exports = {
  default: {
    formatOptions: {
      snippetInterface: 'async-await'
    },
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
      'json:reports/cucumber-report.json'
    ],
    publishQuiet: true
  }
};
