/**
  * @ngdoc controller
  * @module app.controllers.home
  * @name homeController
  * @description
  * Handles the most classic of all the greetings.
  */
(function() {
  'use strict';

  angular.module('app.controllers.home', [])
  .controller('homeController', HomeController);

  function HomeController() {
    var vm = this,
        greetingStart = 'Hello';

    activate();

    function activate() {
      vm.name = 'World!';
      vm.greeting = greetingStart + ' ' + vm.name;
    }
  }

})();
