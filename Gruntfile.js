module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
        release: {
            files: [ { src: './**', dest: './dist/' } ]
        }
    },
    version: {
      release: {
        options: {
          buildNumber: "1.0." + (+new Date())
        }
      },
      dev: {
        options: {
            buildNumber: function() {
                var package = JSON.parse(grunt.file.read('./package.json'));
                var chunks = package.version.split('.');
                chunks[1] = parseInt(chunks[1], 10) + 1;
                return chunks.join('.') + '-pre';
            }()
        }
      }
    },
    clean: ['./dist'],
  });

  // Instead of grunt.loadNpmTasks('...')
  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerMultiTask('version', 'Add build number to the package.json', function() {
    var package = JSON.parse(grunt.file.read('./package.json'));
    package.version = this.options().buildNumber;

    grunt.file.write('./dist/package.json', JSON.stringify(package, null, 2));
  });

  grunt.registerTask('default', ['clean', 'copy', 'version:release']);
};