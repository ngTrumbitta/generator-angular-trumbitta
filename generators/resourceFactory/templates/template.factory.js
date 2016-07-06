/**
  * @ngdoc factory
  * @module <%= factoryModule %>
  * @name <%= factoryName %>
  * @description
  * Data access factory.
  *
  * Handles the access to `/my/entry/point`
  */
(function() {
  'use strict';

  angular.module('<%= factoryModule %>', [
    'ngResource',
    'app.config'
  ])
  .factory('<%= factoryName %>', <%= factoryNameConstructor %>);

  function <%= factoryNameConstructor %>($resource, ENV, $q) {
    return $resource([
      ENV.BACKEND.URL.FULL,
      ENV.BACKEND.ENTRY_POINTS.<%= factoryEntryPoint %>
    ].join(''), {},
      {
        'get':
          {
            method:'GET',
            // cache: true,
            interceptor: {
              responseError: function(error) {
                // console.log('error • get:', error);
                return $q.reject(error);
              }
            }
          }
      }
    );
  }

})();
