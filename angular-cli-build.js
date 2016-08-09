// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs

/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function (defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'ng2-bootstrap/**/*.+(js|js.map)',
      'moment/**/*.+(js|js.map)',
      'angularfire2/**/*.js',
      'firebase/*.js',
      'font-awesome/css/font-awesome.min.css',
      'font-awesome/fonts/fontawesome-webfont.woff',
      'font-awesome/fonts/fontawesome-webfont.woff2',
      'bootstrap/dist/css/bootstrap.css',
      'bootstrap/dist/js/bootstrap.js',
      'jquery/dist/jquery.js',
    ]
  });
};
