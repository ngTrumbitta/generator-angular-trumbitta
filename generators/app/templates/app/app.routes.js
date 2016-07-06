/**
  * @ngdoc object
  * @name app.routes
  * @module app
  * @requires app.controllers.home
  *
  * @description
  * This module configure the `ui-router` with the states.
  *
  * The configured states are:
  * - home
  *
**/
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
