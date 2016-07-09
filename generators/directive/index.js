'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var Case = require('case');

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('directiveName', { type: String, required: false });
    this.directiveName = Case.camel(this.directiveName);
  },
  prompting: function() {

    if (this.directiveName === undefined || this.directiveName === '') {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        chalk.yellow('Welcome to the ') + chalk.yellow.bold('AngularJS app generator, made with') + ' ' + chalk.magenta.bold('❤') + ' ' + chalk.yellow.bold('by Trumbitta!')
      ));

      var prompts = [{
        type: 'input',
        name: 'directiveName',
        message:
          'Enter a name for the directive' +
          '\n(camelCase, no spaces, no special characters)' +
          '\n\nEXAMPLES:' +
          chalk.green('\n[OK] toolBelt') +
          chalk.red('\n[KO] Tool Belt :D') +
          '\n\nDefault: ',
        default: 'myCleverName'
      }];

      this.prompt(prompts, function(props) {
        this.props = props;
        done();
      }.bind(this));
    } else {
      this.props = {
        directiveName: this.directiveName
      };
    }
  },

  writing: function() {
    var directiveNameKebab = Case.kebab(this.props.directiveName),
        directiveNamePascal = Case.pascal(this.props.directiveName);

    this.fs.copyTpl(
      this.templatePath('template.directive.js'),
      this.destinationPath(directiveNameKebab + '.directive.js'),
      {
        directiveName: this.props.directiveName,
        directiveModule: 'app.directives.' + this.props.directiveName.toLowerCase(),
        directiveNameConstructor: directiveNamePascal,
        directiveNameElement: directiveNameKebab
      }
    );

    this.fs.copyTpl(
      this.templatePath('template.directive.spec.js'),
      this.destinationPath(directiveNameKebab + '.directive.spec.js'),
      {
        directiveName: this.props.directiveName,
        directiveModule: 'app.directives.' + this.props.directiveName.toLowerCase(),
        directiveNameElement: directiveNameKebab
      }
    );

    this.fs.copy(
      this.templatePath('template.template.html'),
      this.destinationPath(directiveNameKebab + '.template.html')
    );
  },

  end: function() {
    var directiveNameKebab = Case.kebab(this.props.directiveName);

    this.log(chalk.yellow('\n   Remember to modify\n\n      ') + chalk.green.bold('{ templateUrl: app/shared/directives/' + directiveNameKebab + '/' + directiveNameKebab + '.template.html }') + chalk.yellow('\n\n   to the actual path\n'));
  }
});
