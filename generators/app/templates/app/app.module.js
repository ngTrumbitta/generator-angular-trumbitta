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
