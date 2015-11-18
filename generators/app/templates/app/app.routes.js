/**
  * @ngdoc object
  * @name app.routes
  * @module app
  * @requires app.controllers.home
  * @requires app.controllers.tube
  * @requires app.controllers.supplierList
  * @requires app.controllers.supplier
  *
  * @description
  * This module configure the `ui-router` with the states.
  *
  * The configured states are:
  * - home
  *
**/

angular
  .module('app.routes', [
    'ui.router',
    'app.controllers.home'
  ])

  .config(function($stateProvider, $urlRouterProvider) {
    'use strict';

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/components/home/home.template.html',
        controller: 'homeController',
        controllerAs: 'home'

      });

    $urlRouterProvider.otherwise('/');
  });
