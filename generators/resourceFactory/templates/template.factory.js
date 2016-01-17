angular.module('<%= factoryModule %>', [
  'ngResource',
  'app.config'
  ])

  .factory('<%= factoryName %>', function($resource, ENV, $q) {
    'use strict';

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
  });
