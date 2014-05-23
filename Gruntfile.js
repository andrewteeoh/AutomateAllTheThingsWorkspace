module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
        release: {
            files: [ { src: './**', dest: './dist/' } ]
        }
    },
    clean: ['./dist'],
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['copy', 'clean']);
};