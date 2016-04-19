module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    buildVersion: '<%= pkg.name %>_v<%= pkg.version %>_<%= grunt.template.today("yyyymmdd.HHMM") %>',

    exec: {
      bower_install: 'bower cache clean --config.interactive=false && bower install --config.interactive=false'
    },

    wiredep: {
      app: {
        src: ['<%= pkg.appPath %>/index.html'],
        ignorePath:  /\.\.\//,
        exclude: [
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/bootstrap/dist/js/bootstrap.js'
        ]
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /(\.\.\/){3}/,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
            detect: {
              js: /'(.*\.js)'/gi
            },
            replace: {
              js: '\'{{filePath}}\','
            }
          }
        }
      }
    },

    'customize-bootstrap': {
      app: {
        options: {
          bootstrapPath: 'bower_components/bootstrap',
          src: '<%= pkg.appPath %>/assets/less/bootstrap/overrides',
          dest: '<%= pkg.buildPathDev %>/less/bootstrap/custom'
        }
      }
    },

    less: {
      app: {
        files: {
          '<%= pkg.buildPathDev %>/css/app-custom.css': '<%= pkg.appPath %>/assets/less/app-custom.less'
        }
      },
      bootstrap: {
        files: {
          '<%= pkg.buildPathDev %>/css/bootstrap.css': '<%= pkg.buildPathDev %>/less/bootstrap/custom/bootstrap.less'
        }
      }
      // bootstrap_theme: {
      //   files: {
      //     '<%= pkg.buildPathDev %>/css/bootstrap-theme.css': '<%= pkg.appPath %>/assets/less/bootstrap/overrides/theme.less'
      //   }
      // }
    },

    clean: {
      build: {
        src: [
          '<%= pkg.buildPath %>/**'
        ]
      },
      dist: {
        src: [
        '<%= pkg.distPath %>/**/*'
        ]
      }
    },

    lesslint: {
      src: ['<%= pkg.appPath %>/assets/less/app-custom.less'],
      imports: ['<%= pkg.appPath %>/assets/less/imports/**/*.less'],
      options: {
        csslint: {
          csslintrc: '<%= pkg.appPath %>/.csslintrc'
        }
      }
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

    jscs: {
      dev: {
        options: {
          config: '<%= pkg.appPath %>/.jscsrc'
        },
        files: {
          src: ['<%= jshint.all.src %>']
        }
      }
    },

    copy: {
      dev_index: {
        src: '<%= pkg.appPath %>/index.html',
        dest: '<%= pkg.buildPathDev %>/index.html'
      },
      dev_glyphicons: {
        expand: true,
        cwd: 'bower_components/bootstrap',
        src: 'fonts/**',
        dest: '<%= pkg.buildPathDev %>/'
      },
      dev_i18n_js: {
        expand: true,
        cwd: '<%= pkg.appPath %>/assets',
        src: 'js/i18n/**',
        dest: '<%= pkg.buildPathDev %>/'
      },
      dev_images: {
        expand: true,
        cwd: '<%= pkg.appPath %>/assets',
        src: 'images/**',
        dest: '<%= pkg.buildPathDev %>/'
      },
      dist_prepare: {
        expand: true,
        cwd: '<%= pkg.buildPathDev %>',
        src: '**',
        dest: '<%= pkg.buildPathDist %>/'
      },
      dist_update_html: {
        expand: true,
        cwd: '<%= pkg.buildPathDev %>',
        src: 'index.html',
        dest: '<%= pkg.distPath %>/'
      },
      dist_update_fonts: {
        expand: true,
        cwd: '<%= pkg.buildPathDev %>',
        src: 'fonts/**',
        dest: '<%= pkg.distPath %>/'
      },
      dist_update_images: {
        expand: true,
        cwd: '<%= pkg.buildPathDev %>',
        src: 'images/**',
        dest: '<%= pkg.distPath %>/'
      },
      dist_update_fontawesome: {
        expand: true,
        cwd: '<%= pkg.appPath %>/bower_components/fontawesome',
        src: 'fonts/**',
        dest: '<%= pkg.distPath %>/'
      },
      dist_update_i18n: {
        expand: true,
        cwd: '<%= pkg.appPath %>/assets/js',
        src: 'i18n/**',
        dest: '<%= pkg.distPath %>/'
      },
      dist_package_prepare: {
        expand: true,
        cwd: '<%= pkg.distPath %>',
        src: '**/**',
        dest: '<%= pkg.buildPath %>/<%= buildVersion %>'
      }
    },

    ngtemplates: {
      app: {
        cwd: '<%= pkg.appPath %>',
        src: 'app/**/**.html',
        dest: '<%= pkg.buildPathDev %>/js/views.js',
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
      dev: {
        // the files to concatenate
        src: [
          'app/**/*.service.js',
          'app/**/*.factory.js',
          'app/**/*.filter.js',
          'app/**/*.directive.js',
          'app/**/*.controller.js',
          'app/**/*.routes.js',
          'app/**/*.module.js',
          '<%= pkg.buildPathDev %>/js/views.js',
          '<%= pkg.buildPathDev %>/js/config.js',
          '<%= ngtemplates.app.dest %>',
          '<%= ngconstant.options.dest %>'
        ],
        // the location of the resulting JS file
        dest: '<%= pkg.buildPathDev %>/js/<%= pkg.appName %>.concat.js'
      },
      dist: {
        // the files to concatenate
        src: [
          'app/**/*.service.js',
          'app/**/*.factory.js',
          'app/**/*.filter.js',
          'app/**/*.directive.js',
          'app/**/*.controller.js',
          'app/**/*.routes.js',
          'app/**/*.module.js',
          '<%= pkg.buildPathDev %>/js/views.js',
          '<%= pkg.buildPathDev %>/js/config.js',
          '<%= ngtemplates.app.dest %>',
          '<%= ngconstant.options.dest %>'
        ],
        // the location of the resulting JS file
        dest: '<%= pkg.buildPathDist %>/js/<%= pkg.appName %>.concat.js'
      }
    },

    ngAnnotate: {
      all: {
        // Target-specific file lists and/or options go here.
        files: {
          '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
        }
      }
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['newer:jscs:dev', 'newer:jshint:all']
      },
      index: {
        files: ['index.html'],
        tasks: ['copy:dev_index'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['<%= jshint.all.src[1] %>'],
        tasks: ['newer:jscs:dev', 'newer:jshint:all', 'newer:concat:dev', 'newer:jshint:test', 'karma', 'ngdocs'],
        options: {
          livereload: true
        }
      },
      templates: {
        files: ['<%= pkg.appPath %>/app/**/*.template.html'],
        tasks: ['newer:ngtemplates', 'newer:concat:dev', 'karma'],
        options: {
          livereload: true
        }
      },
      lessApp: {
        files: ['<%= pkg.appPath %>/assets/less/*.less'],
        tasks: ['lesslint', 'less:app'],
        options: {
          livereload: true
        }
      },
      lessBootstrap: {
        files: ['<%= pkg.appPath %>/assets/less/bootstrap/**/*.less'],
        tasks: ['lesslint', 'less'], // my own app-custom.less includes bootstrap variables
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '<%= pkg.appPath %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    karma: {
      unit: {
        configFile: '<%= pkg.appPath %>/app/shared/config/karma.config.js',
        singleRun: true
      }
    },

    connect: {
      dev: {
        options: {
          port: 9001,
          base: ['<%= pkg.buildPathDev %>', '<%= pkg.appPath %>']
        }
      }
    },

    nggettext_extract: {
      pot: {
        files: {
          '<%= pkg.appPath %>/po/template.pot': [
            '<%= pkg.appPath %>/app/**/**.html',
            '<%= pkg.appPath %>/index.html',
            '<%= jshint.all.src[1] %>'
          ]
        }
      }
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
            src: ['*.po'],
            dest: '<%= pkg.appPath %>/assets/js/i18n',
            ext: '.json'
          }
        ]
      }
    },

    ngconstant: {
      options: {
        name: 'app.config',
        dest: '<%= pkg.buildPathDev %>/js/config.js'
      },
      dist: {
        constants: '<%= pkg.appPath %>/app/shared/config/dist.config.json'
      },
      dev: {
        constants: '<%= pkg.appPath %>/app/shared/config/dev.config.json'
      }
    },

    useminPrepare: {
      build: {
        src: ['<%= pkg.buildPathDist %>/index.html'],
        dest: '<%= pkg.buildPathDist %>'
      },
      options: {
        flow: {
          steps: { js: ['concat', 'uglifyjs'], css: ['concat', 'cssmin'] },
          post: {
            css: [{
              name: 'concat',
              createConfig: function(context) {
                var generated = context.options.generated;
                generated.options = {
                  stripBanners: { block: true },
                  separator: '\n'
                };
              }
            }]
          }
        }
      }
    },

    filerev: {
      // waiting to test how to support image references inside compiled angular templates
      // images: {
      //   src: '<%= pkg.buildPathDist %>/images/**/*.{jpg,jpeg,gif,png,webp}',
      //   dest: '<%= pkg.distPath %>/images/'
      // },
      css: {
        src: '<%= pkg.distPath %>/styles/**/*.css'
      },
      js: {
        src: '<%= pkg.distPath %>/scripts/**/*.js'
      }
    },

    usemin: {
      html: ['<%= pkg.distPath %>/index.html']
    },

    compress: {
      dist_package: {
        options: {
          archive: '<%= pkg.buildPath %>/<%= buildVersion %>.tar.gz',
          mode: 'tgz',
          pretty: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= pkg.buildPath %>',
            src: '<%= buildVersion %>/**'
          }
        ]
      }
    },

    ngdocs: {
      options: {
        dest: 'dist/docs',
        scripts: [
          'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular.min.js',
          'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular-animate.min.js'
        ],
        title: 'App Documentation',
        html5Mode: false,
        startPage: '/api/app'
      },
      api: {
        src: ['app/**/*.js'],
        title: 'Reference'
      }
    }

  });

  grunt.registerTask('build', [
    'exec',
    'clean:build',
    'wiredep',
    'jscs:dev',
    'jshint',
    'ngtemplates',
    'customize-bootstrap:app',
    'lesslint',
    'less',
    'nggettext_compile',
    'copy:dev_index',
    'copy:dev_glyphicons',
    'copy:dev_images',
    'copy:dev_i18n_js'
  ]);

  grunt.registerTask('memento_test', function() {
    grunt.log.writeln('\n\tI’m Commander Shepard, and this is my favourite memento on this terminal:'.blue.bold);
    grunt.log.writeln('\n\tRemember to always run a "grunt test" before building a dist!\n'.yellow.bold);
  });

  grunt.registerTask('dist', [
    'clean:dist',
    'build',
    'ngconstant:dist',
    'copy:dist_prepare',
    'concat:dist',
    'ngAnnotate',
    // 'karma',
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'copy:dist_update_html',
    'copy:dist_update_fonts',
    'copy:dist_update_fontawesome',
    'copy:dist_update_images',
    'copy:dist_update_i18n',
    'usemin',
    'memento_test'
  ]);

  grunt.registerTask('dist-package', [
    'dist',
    'copy:dist_package_prepare',
    'compress:dist_package'
  ]);

  grunt.registerTask('dev', [
    'build',
    'ngconstant:dev',
    'concat:dev',
    'connect:dev',
    'karma',
    'ngdocs',
    'watch'
  ]);

  grunt.registerTask('test', [
    'jscs:dev',
    'jshint:test',
    'karma'
  ]);

  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.log.warn('The `serve:dist` target is currently unavailable.\nUse `grunt dist` to build a new dist into the `dist` folder, then serve it as you prefer.');
      // return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'dev'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('docs', 'Generate the documentation in dist/docs.', ['ngdocs']);

};
