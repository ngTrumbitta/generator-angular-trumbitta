angular
  .module('app.routes', [
    'ui.router',
    'app.controllers.home'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
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
