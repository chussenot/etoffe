
module.exports = (grunt) -> 
  grunt.initConfig  

    pkg: "<json:package.json>"
    meta:
      banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " + "<%= grunt.template.today(\"yyyy-mm-dd\") %> */"
    
    # Task configuration.
    release:
      options:
        file: "package.json"
        push: false
        npm: false
        tagName: "v<%= version %>"
        commitMessage: "Release for <%= version %>"

    coffee:
      compile:
        files:
          "tests/js/etoffe.js": "src/etoffe.coffee"
    sass:
      css:
        options:
          unixNewlines: true,
          style: 'expanded'
        files:
          'tests/css/etoffe.css': 'src/etoffe.sass'
    copy:
      main:
        files: [
          {
          expand: true,
          src: ['assets/**'],
          dest: 'tests/'
          }
        ]
        
  # These plugins provide necessary tasks.
  grunt.loadNpmTasks "grunt-contrib-concat"
  # grunt.loadNpmTasks "grunt-contrib-uglify"
  # grunt.loadNpmTasks "grunt-contrib-qunit"
  # grunt.loadNpmTasks "grunt-contrib-jshint"
  # grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-release"
  grunt.loadNpmTasks "grunt-contrib-copy"
  
  # Default task.
  grunt.registerTask "default", ["coffee","sass","copy"]