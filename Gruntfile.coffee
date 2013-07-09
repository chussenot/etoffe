"use strict"
LIVERELOAD_PORT = 35729
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)
mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

module.exports = (grunt) ->
  # autoload all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

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
          "tests/js/etoffe.js": "src/javascripts/etoffe.coffee"
    sass:
      css:
        options:
          unixNewlines: true,
          style: 'expanded'
        files:
          'tests/css/etoffe.css': 'src/stylesheets/etoffe.sass'
    copy:
      main:
        files: [
          {
          expand: false,
          src: ['assets/etoffe/*'],
          dest: 'tests/',
          filter: 'isFile',
          flatten: true
          }
        ]
    watch:
      css:
        files: ['src/stylesheets/*.sass'],
        tasks: ['sass']
      coffee:
        files: ['src/javascripts/*.coffee']
        tasks: ['coffee']

    connect:
      options:
        port: 9000
        # change this to '0.0.0.0' to access the server from outside
        hostname: "localhost"
      livereload:
        options:
          middleware: (connect) ->
            [lrSnippet, mountFolder(connect, ".tmp"), mountFolder(connect, 'tests')]

    open:
      server:
        path: "http://localhost:<%= connect.options.port %>"

  # Default task.
  grunt.registerTask "build", ["coffee","sass","copy"]
  grunt.registerTask "default", ["build"]
  grunt.registerTask "server", ["build","open","connect:livereload:keepalive"]
