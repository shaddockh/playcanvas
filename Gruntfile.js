module.exports = function (grunt) {

  var jsdirs = ['lander_ex/**/*.js', 'tutorial-1/**/*.js', 'isoshooter/**/*.js', 'common/**/*.js'];
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: ['tutorial-1/',
            'lander_ex/',
            'isoshooter/'
          ],
          //themedir: 'path/to/custom/theme/',
          outdir: 'docs'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', '_fe/js/*.js'].concat(jsdirs),
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jsbeautifier: {
      modify: {
        src: ['Gruntfile.js', '_fe/js/**/*.js'].concat(jsdirs),
        options: {
          config: '.jsbeautifyrc'
        }
      },
      verify: {
        src: ['Gruntfile.js', '_fe/js/**/*.js'].concat(jsdirs),
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    }

  });
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  grunt.registerTask('docs', ['yuidoc']);

  grunt.registerTask('clean', ['jsbeautifier:modify', 'jshint']);
  grunt.registerTask('verify', ['jsbeautifier:verify', 'jshint']);
  grunt.registerTask('default', ['verify', 'docs']);
};
