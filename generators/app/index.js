'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.yellow('Welcome to the ') + chalk.yellow.bold('AngularJS app generator, made with') + ' ' + chalk.magenta.bold('❤') + ' ' + chalk.yellow.bold('by Trumbitta!')
    ));

    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message:
          'Enter a name for the app' +
          '\n(all lowercase, no spaces, no special characters)' +
          '\n\nEXAMPLES:' +
          chalk.green('\n[OK] robotcrasher') +
          chalk.red('\n[KO] suPer Awesome Robot-Crasher!') +
          '\n\nDefault: ',
        default: 'robotcrasher'
      },
      {
        type: 'input',
        name: 'appDescription',
        message:
          'Enter a description for the app' +
          '\n(try to be meaningful, while using less than 10-15 words)' +
          '\n\nEXAMPLES:' +
          chalk.green('\n[OK] A robot crashing app with Spaceship integrations') +
          chalk.green('\n[OK] A robot crashing app') +
          chalk.red('\n[KO] app') +
          '\n\nDefault: ',
        default: 'A robot crashing app with Spaceship integrations'
      },
      {
        type: 'input',
        name: 'appAuthor',
        message:
          'Enter your full name' +
          '\n\nDefault: ',
        default: 'Panzer Kunst'
      },
      {
        type: 'input',
        name: 'appAuthorEmail',
        message:
          'Enter your email' +
          '\n\nDefault: ',
        default: 'gunnm@nova.com'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  configuring: function () {
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      {
        appName: this.props.appName,
        appDescription: this.props.appDescription,
        appAuthor: this.props.appAuthor,
        appAuthorEmail: '<' + this.props.appAuthorEmail + '>'
      }
    );
    this.fs.copy(
      this.templatePath('_Gruntfile.js'),
      this.destinationPath('Gruntfile.js')
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        appName: this.props.appName,
        appDescription: this.props.appDescription,
        appAuthor: this.props.appAuthor,
        appAuthorEmail: '<' + this.props.appAuthorEmail + '>'
      }
    );
    this.fs.copy(
      this.templatePath('_README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copy(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc')
    );
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('jscsrc'),
      this.destinationPath('.jscsrc')
    );
    this.fs.copy(
      this.templatePath('jshintignore'),
      this.destinationPath('.jshintignore')
    );
    this.fs.copy(
      this.templatePath('jshintrc'),
      this.destinationPath('.jshintrc')
    );
    this.fs.copy(
      this.templatePath('npmignore'),
      this.destinationPath('.npmignore')
    );
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_index.html'),
      this.destinationPath('index.html'),
      {
        appName: this.props.appName,
        appDescription: this.props.appDescription,
        appAuthor: this.props.appAuthor,
        appAuthorEmail: '<' + this.props.appAuthorEmail + '>'
      }
    );
    this.fs.copy(
      this.templatePath('app'),
      this.destinationPath('app')
    );
    this.fs.copy(
      this.templatePath('assets'),
      this.destinationPath('assets')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
