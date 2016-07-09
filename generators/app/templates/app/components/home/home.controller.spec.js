describe('Controller: app.controllers.home', function() {
  'use strict';
  var vm,
      $rootScope,
      $scope,
      $controller;

  beforeEach(module('app.controllers.home'));

  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $controller = _$controller_;

    vm = $controller('homeController as vm', {'$rootScope': $rootScope, '$scope': $scope});
  }));

  it('should define a greeting', function() {
    expect(vm.greeting).toBeDefined();
  });

  it('should greet the world', function() {
    expect(vm.greeting).toBe('Hello World!');
  });

});
