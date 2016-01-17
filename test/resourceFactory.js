'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-angular-trumbitta:resourceFactory', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/resourceFactory'))
      .withPrompts({factoryName: 'myFactory'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'my-factory.factory.js',
      'my-factory.factory.spec.js'
    ]);
  });
});
