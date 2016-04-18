'use strict';

exports.config = {
  // webdriver-manager start
  // will show the ip address for the selenium address at the bottom, default is http://localhost:4444/wd/hub

  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [ './test/bundles/e2e_bundle.js']
};
