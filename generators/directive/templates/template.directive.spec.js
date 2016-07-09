describe('Directive: <%= directiveModule %>', function() {
  'use strict';
  var $compile,
      $rootScope;

  beforeEach(module('<%= directiveModule %>'));
  beforeEach(module('app.test.templates'));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {
    var directiveHtml = [
      '<<%= directiveNameElement %>',
      ' my-attribute="myValue">',
      '</<%= directiveNameElement %>>'].join('');

    var element = $compile(directiveHtml)($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('myValue');
  });
});
