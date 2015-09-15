describe('Controller: app.controllers.home', function() {
  'use strict';
  var vm,
      scope;

  beforeEach(module('app.controllers.home'));

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    vm = $controller('homeController as vm', { $scope: scope });
  }));

  it('should define a greeting', function() {
    expect(vm.greeting).toBeDefined();
  });

  it('should greet the world', function() {
    expect(vm.greeting).toBe('Hello World!');
  });

});
