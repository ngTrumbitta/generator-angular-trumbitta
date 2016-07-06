/**
  * @ngdoc object
  * @name app.controllers.home
  * @module app.controllers
  *
  * @description
  * Provides the {@link app.controllers.home.homeController homeController}
  *
**/
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
