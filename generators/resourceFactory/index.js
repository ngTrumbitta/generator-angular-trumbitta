'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var Case = require('case');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    // This makes `appname` a required argument.
    this.argument('factoryName', { type: String, required: false });
    // And you can then access it later on this way; e.g. CamelCased
    this.factoryName = Case.camel(this.factoryName);
  },
  prompting: function () {

    if (this.factoryName === undefined || this.factoryName === '') {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        chalk.yellow('Welcome to the ') + chalk.yellow.bold('AngularJS app generator, made with') + ' ' + chalk.magenta.bold('❤') + ' ' + chalk.yellow.bold('by Trumbitta!')
      ));

      var prompts = [{
        type: 'input',
        name: 'factoryName',
        message:
          'Enter a name for the resource factory' +
          '\n(camelCase, no spaces, no special characters)' +
          '\n\nEXAMPLES:' +
          chalk.green('\n[OK] jetPack') +
          chalk.red('\n[KO] Jet Pack @_@') +
          '\n\nDefault: ',
        default: 'myCleverName'
      }];

      this.prompt(prompts, function (props) {
        this.props = props;
        // To access props later use this.props.someOption;

        done();
      }.bind(this));
    } else {
      this.props = {
        factoryName: this.factoryName
      };
    }
  },

  writing: function () {
    var factoryNameKebab = Case.kebab(this.props.factoryName),
        factoryNameConstant = Case.constant(this.props.factoryName),
        factoryNamePascal = Case.pascal(this.props.factoryName);

    this.factoryNameConstant = factoryNameConstant;

    this.fs.copyTpl(
      this.templatePath('template.factory.js'),
      this.destinationPath(factoryNameKebab + '.factory.js'),
      {
        factoryName: this.props.factoryName + 'Factory',
        factoryModule: 'app.factories.' + this.props.factoryName.toLowerCase(),
        factoryEntryPoint: factoryNameConstant
      }
    );

    this.fs.copyTpl(
      this.templatePath('template.factory.spec.js'),
      this.destinationPath(factoryNameKebab + '.factory.spec.js'),
      {
        factoryName: this.props.factoryName + 'Factory',
        factoryNameMock: 'mock' + factoryNamePascal,
        factoryNameRequestHandler: this.props.factoryName + 'RequestHandler',
        factoryModule: 'app.factories.' + this.props.factoryName.toLowerCase(),
        factoryEntryPoint: factoryNameConstant
      }
    );
  },

  end: function () {
    this.log(chalk.yellow('\n   Remember to add\n\n      ') + chalk.green.bold('"' + this.factoryNameConstant + '": "/my/rest/url"') + chalk.yellow('\n\n   to ENV.BACKEND.ENTRY_POINTS in app/shared/config/*.config.json\n'));
  }
});
