/**
  * @ngdoc object
  * @name app.controllers.home
  * @module app.controllers
  *
  * @description
  * Provides the {@link app.controllers.home.homeController homeController}
  *
**/
angular.module('app.controllers.home', [])

/**
  * @ngdoc controller
  * @name app.controllers.home.homeController
  * @description
  *
  * Handles the main page of app. See {@link app.routes the routes.}
  *
**/
.controller('homeController', function() {

  'use strict';

  var vm = this,
      greetingStart = 'Hello';

  vm.name = 'World!';
  vm.greeting = greetingStart + ' ' + vm.name;

});
