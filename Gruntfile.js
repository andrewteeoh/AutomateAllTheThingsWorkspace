module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
        release: {
            files: [ { src: './**', dest: './dist/' } ]
        }
    },
    version: {
      options: {
          buildNumber: "1.0." + (+new Date())
      }
    },
    clean: ['./dist'],
  });

  // Instead of grunt.loadNpmTasks('...')
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('version', 'Add build number to the package.json', function() {
    var package = JSON.parse(grunt.file.read('./package.json'));
    package.version = this.options().buildNumber;

    grunt.file.write('./dist/package.json', JSON.stringify(package, null, 2));
  });

  grunt.registerTask('default', ['clean', 'copy', 'version']);
};