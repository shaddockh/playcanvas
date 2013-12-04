module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths:['tutorial-1/',
                        'lander_ex/',
                        'isoshooter/'
                    ],
                    //themedir: 'path/to/custom/theme/',
                    outdir: 'docs'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('docs', ['yuidoc']);
};