/**
 * Copy - copies files like assets or temporary build files.
 */
module.exports = function(grunt) {
  'use strict';

  grunt.config('copy', {
    
    assets: {
      files: [
        {
          expand: true,
          cwd: '<%= xh.src %>',
          src: ['<%= xh.assets %>/**/*.*', '!**/.keep'],
          dest: '<%= xh.dist %>'
        }
      ]
    },

    js: {
      expand: true,
      cwd: '<%= xh.src %>/js/',
      src: ['main.js', 'jquery.min.js', 'salvatorre.min.js'],
      dest: '<%= xh.dist %>/js/'
    },

    // copy all include files to temporary folder
    // so that original includes aren't ever modified
    includes: {
      expand: true,
      cwd: '<%= xh.includes %>',
      src: [ '*.*' ],
      dest: '<%= xh.tmp %>'
    }
  });
};
