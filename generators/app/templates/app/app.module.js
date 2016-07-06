/**
  * @ngdoc overview
  * @module app
  * @name app
  * @description
  * This Angular app has been generated with the
  * {@link https://github.com/ngTrumbitta/generator-angular-trumbitta generator-angular-trumbitta}
  * Yeoman generator, version `0.6.0`.
  *
  * ## Main features
  *
  * * One highlight
  * * Another highlight
  *
  */
(function() {
  'use strict';

  angular.module('app', [
    'app.config',
    'app.routes',
    'gettext'
  ])
  .run(run);

  run.$inject = ['gettextCatalog', 'ENV'];
  function run(gettextCatalog, ENV) {
    var lang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    lang = lang.substring(0,2);

    gettextCatalog.setCurrentLanguage(lang);
    gettextCatalog.loadRemote(ENV.I18N.BASE_URL + lang + '.json');
    //
    // Useful for debugging:
    //
    // gettextCatalog.debug = true;
    // gettextCatalog.showTranslatedMarkers = true;
  }

})();
