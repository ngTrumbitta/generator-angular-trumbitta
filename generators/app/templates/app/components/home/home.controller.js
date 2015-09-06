angular.module('app.controllers.home', [])

  .controller('homeController', function() {

    'use strict';

    var vm = this,
        greetingStart = 'Hello';

    vm.name = 'World!';
    vm.greeting = greetingStart + ' ' + vm.name;

  }

);
