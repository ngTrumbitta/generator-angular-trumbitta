/**
  * @ngdoc directive
  * @module <%= directiveModule %>
  * @name <%= directiveName %>
  * @description
  * Thin directive: prepare data in a controller, and pass it to the directive
  * via scope variables.
  *
  * Usage:
  *
  * <pre>
  *   <<%= directiveNameElement %>
  *     my-attribute="myValue"
  *     another-attribute="anotherValue">
  *   </<%= directiveNameElement %>>
  * </pre>
  */
(function() {
  'use strict';

  angular.module('<%= directiveModule %>', [])
  .directive('<%= directiveName %>', function() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/shared/directives/<%= directiveNameElement %>/<%= directiveNameElement %>.template.html',
      scope: {
        myAttribute: '@'
      }
    };
  });

})();
