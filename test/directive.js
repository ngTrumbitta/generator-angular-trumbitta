'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-angular-trumbitta:directive', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/directive'))
      .withPrompts({directiveName: 'myDirective'})
      .on('end', done);
  });

  it('creates files', function() {
    assert.file([
      'my-directive.directive.js',
      'my-directive.directive.spec.js'
    ]);
  });
});
