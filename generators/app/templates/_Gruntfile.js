module.exports = function(grunt) {

  'use strict';

  var _ = require('lodash');
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    exec: {
      bower_install: 'bower cache clean --config.interactive=false && bower install --config.interactive=false'
    },

    bower_concat: {
      all: {
        dest: '<%= pkg.buildPath %>/js/_bower.js',
        cssDest: '<%= pkg.buildPath %>/css/_bower.css',
        include: [
            'angular',
            'angular-ui-router',
            'jquery',
            'fontawesome',
            'angular-resource',
            'angular-gettext',
            'lodash'
        ],
        callback: function(mainFiles) {
          return _.map(mainFiles, function(filepath) {
            // Use minified files if available
            var min = filepath.replace(/\.js$/, '.min.js');
            return grunt.file.exists(min) ? min : filepath;
          });
        }
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.appName %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      bower: {
        files: {
          '<%= pkg.distPath %>/js/<%= pkg.appName %>-bower.min.js': [
            '<%= bower_concat.all.dest %>'
          ]
        }
      },
      app: {
        files: {
          '<%= pkg.distPath %>/js/<%= pkg.appName %>.min.js': [
            '<%= pkg.buildPath %>/js/<%= pkg.appName %>.annotated.js'
          ]
        }
      }
    },

    'customize-bootstrap': {
      app: {
        options: {
          bootstrapPath: 'bower_components/bootstrap',
          src: '<%= pkg.appPath %>/assets/less/bootstrap/overrides',
          dest: '<%= pkg.buildPath %>/less/bootstrap/custom',
        }
      },
    },

    less: {
      app: {
        files: {
          '<%= pkg.buildPath %>/css/app-custom.css': '<%= pkg.appPath %>/assets/less/app-custom.less'
        }
      },
      bootstrap: {
        files: {
          '<%= pkg.buildPath %>/css/bootstrap.css': '<%= pkg.buildPath %>/less/bootstrap/custom/bootstrap.less'
        }
      }
    },

    cssmin: {
      assets: {
        options: {
          banner: '/*! <%= pkg.appName %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          '<%= pkg.distPath %>/css/<%= pkg.appName %>.min.css': [
            '<%= pkg.buildPath %>/css/bootstrap.css',
            '<%= pkg.buildPath %>/css/**/*.css'
          ]
        }
      },
      bower: {
        files: {
          '<%= pkg.distPath %>/css/bower.min.css': [
            '<%= bower_concat.all.cssDest %>'
          ]
        }
      }

    },

    clean: {
      src: [
        '<%= pkg.buildPath %>/**/*'
      ]
    },

    jshint: {
      all: {
        // define the files to lint
        src: ['Gruntfile.js', '<%= pkg.appPath %>/app/**/*.js'],
        // configure JSHint (documented at http://www.jshint.com/docs/)
        options: {
          jshintrc: true,
          // more options here if you want to override JSHint defaults
          globals: {
            jQuery: true,
            console: true,
            module: true,
            angular: false
          }
        }
      },
      test: {
        // define the files to lint
        src: ['<%= pkg.appPath %>/app/**/*.spec.js'],
        // configure JSHint (documented at http://www.jshint.com/docs/)
        options: {
          jshintrc: true
        }
      }

    },

    copy: {
      index: {
        src: '<%= pkg.appPath %>/index.html',
        dest: '<%= pkg.distPath %>/index.html'
      },
      fontawesome: {
        expand: true,
        cwd: 'bower_components/fontawesome',
        src: 'fonts/**',
        dest: '<%= pkg.distPath %>/'
      },
      images: {
        expand: true,
        cwd: '<%= pkg.appPath %>/assets',
        src: 'images/**',
        dest: '<%= pkg.distPath %>/'
      },
      jsBowerDev: {
        expand: true,
        cwd: '<%= pkg.buildPath %>',
        src: 'js/_bower.js',
        dest: '<%= pkg.distPath %>/'
      },
      jsAppDev: {
        expand: true,
        cwd: '<%= pkg.buildPath %>',
        src: 'js/<%= pkg.appName %>.annotated.js',
        dest: '<%= pkg.distPath %>/'
      }
    },

    ngtemplates: {
      app: {
        cwd: '<%= pkg.appPath %>',
        src: 'app/**/**.html',
        dest: '<%= pkg.buildPath %>/js/views.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true          }
        }
      }
    },

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      build: {
        // the files to concatenate
        src: [
          'app/**/*.service.js',
          'app/**/*.factory.js',
          'app/**/*.filter.js',
          'app/**/*.directive.js',
          'app/**/*.controller.js',
          'app/**/*.routes.js',
          'app/**/*.module.js',
          '<%= pkg.buildPath %>/js/views.js',
          'tmp/build/js/config.js',
          '<%= ngtemplates.app.dest %>',
          '<%= ngconstant.options.dest %>'
        ],
        // the location of the resulting JS file
        dest: '<%= pkg.buildPath %>/js/<%= pkg.appName %>.concat.js'
      }
    },

    ngAnnotate: {
      all: {
        // Target-specific file lists and/or options go here.
        files: {
          '<%= pkg.buildPath %>/js/<%= pkg.appName %>.annotated.js': ['<%= concat.build.dest %>']
        }
      },
    },

    watch: {
      js: {
        files: ['<%= jshint.all.src[1] %>'],
        tasks: ['newer:jshint:all', 'newer:concat', 'newer:ngAnnotate', 'newer:uglify:bower', 'newer:uglify:app', 'newer:jshint:test', 'karma'],
        options: {
          livereload: true,
        }
      },
      templates: {
        files: ['<%= pkg.appPath %>/app/**/*.template.html'],
        tasks: ['newer:ngtemplates', 'newer:concat', 'newer:ngAnnotate', 'newer:uglify:bower', 'newer:uglify:app', 'karma'],
        options: {
          livereload: true,
        }
      },
      less: {
        files: ['<%= pkg.appPath %>/assets/less/**/*.less'],
        tasks: ['customize-bootstrap', 'less', 'newer:cssmin'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['<%= pkg.appPath %>/assets/css/**/*.css'],
        tasks: ['newer:cssmin'],
        options: {
          livereload: true,
        }
      },
      index: {
        files: ['<%= pkg.appPath %>/index.html'],
        tasks: ['copy:index'],
        options: {
          livereload: true,
        }
      }
    },

    karma: {
      unit: {
        configFile: '<%= pkg.appPath %>/app/shared/config/karma.config.js',
        singleRun: true
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: '<%= pkg.distPath %>'
        }
      }
    },

    nggettext_extract: {
      pot: {
        files: {
          'po/template.pot': [
            '<%= pkg.appPath %>/app/**/**.html',
            '<%= jshint.all.src[1] %>'
          ]
        }
      },
    },

    nggettext_compile: {
      all: {
           options: {
               format: 'json'
           },
           files: [
               {
                   expand: true,
                   dot: true,
                   cwd: '<%= pkg.appPath %>/po',
                   dest: '<%= pkg.distPath %>/js/i18n',
                   src: ['*.po'],
                   ext: '.json'
               }
           ]
       }
    },

    ngconstant: {
      options: {
        name: 'app.config',
        dest: '<%= pkg.buildPath %>/js/config.js'
      },
      dist: {
        constants: '<%= pkg.appPath %>/app/shared/config/dist.config.json'
      },
      dev: {
        constants: '<%= pkg.appPath %>/app/shared/config/dev.config.json'
      }
    }

  });

  grunt.registerTask('default', [
    'exec',
    'clean',
    'bower_concat',
    'copy:index',
    'copy:fontawesome',
    'copy:images',
    'ngconstant:dev',
    'jshint',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'uglify:bower',
    'uglify:app',
    'customize-bootstrap',
    'less',
    'cssmin',
    'nggettext_compile',
    'karma'
  ]);

  // not really the best dist task ever
  grunt.registerTask('dist', [
    'exec',
    'clean',
    'bower_concat',
    'copy:index',
    'copy:fontawesome',
    'copy:images',
    'ngconstant:dist',
    'jshint',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'uglify:bower',
    'uglify:app',
    'customize-bootstrap',
    'less',
    'cssmin',
    'nggettext_compile',
    'karma'
  ]);

  grunt.registerTask('dev', [
    'exec',
    'clean',
    'bower_concat',
    'copy:index',
    'copy:fontawesome',
    'copy:images',
    'ngconstant:dev',
    'jshint',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'uglify:bower',
    'uglify:app',
    'customize-bootstrap',
    'less',
    'cssmin',
    'nggettext_compile',
    'connect',
    'karma',
    'watch'
  ]);

  grunt.registerTask('test', [
    'jshint:test',
    'karma'
  ]);

};
