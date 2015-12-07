/**
  * @ngdoc overview
  * @name app
  * @module app
  * @requires app.config
  *
  * @description
  * ## App
  * This is angular app has been generated with `generator-angular-trumbitta`
  *
  * App does this:
  * * thing1
  * * thing2
  *
*/
angular
  .module('app', [
    'app.config',
    'app.routes',
    'gettext'
])

  .run(function(gettextCatalog, ENV) {
    'use strict';

    var lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    lang = lang.substring(0,2);

    gettextCatalog.setCurrentLanguage(lang);
    gettextCatalog.loadRemote(ENV.I18N.BASE_URL + lang + '.json');
    //
    // Useful for debugging:
    //
    // gettextCatalog.debug = true;
    // gettextCatalog.showTranslatedMarkers = true;
  });


/**
  * @ngdoc object
  * @name app.controllers
  * @module app
  * @description
  *
  * It is a logic container.
  *
  * All the controllers of the apps belong to this package.
**/

/**
  * @ngdoc object
  * @name app.directives
  * @module app
  * @description
  *
  * It is a logic container.
  *
  * All the directives of the apps belong to this package.
**/

/**
  * @ngdoc object
  * @name app.factories
  * @module app
  * @description
  *
  * It is a logic container.
  *
  * All the factories of the apps belong to this package.
**/

/**
  * @ngdoc object
  * @name app.services
  * @module app
  * @description
  *
  * It is a logic container.
  *
  * All the services of the apps belong to this package.
**/

/**
  * @ngdoc object
  * @name app.filters
  * @module app
  * @description
  *
  * It is a logic container.
  *
  * All the filters of the apps belong to this package.
**/
