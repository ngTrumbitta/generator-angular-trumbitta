/**
  * @ngdoc module
  * @module app.routes
  * @name routes
  * @description
  * Configures the routes, using `ui.router`.
  *
  * Also notable is ...
  */
(function() {
  'use strict';

  angular.module('app.routes', [
    'ui.router',
    'app.controllers.home'
  ])
  .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];
  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.template.html',
        controller: 'homeController',
        controllerAs: 'home'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
