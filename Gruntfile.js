module.exports = function (grunt) {
  const __preferLocal = { preferLocal: true }
  const __preferNotLocal = { preferLocal: false }

  grunt.initConfig({
    // template vars
    __cwd: __dirname,

    // shell plugin
    shell: {
      purge: {
        command: [
          'npm install',
          'rm -f package-lock.json',
          'rm -f *.tgz',
          'rm -rf ./docs',
          'npm uninstall',
          'rm -rf ./node_modules',
          'rm -rf ./.nyc_output'
        ].join(' && '),
        options: __preferNotLocal
      },
      eslintInit: {
        command: 'printf \'%s\n%s\n%s\n\' \'Use the following to initialize eslint:\' \'cd "<%= __cwd %>"\' ' +
          '\'eslint --init\''
      },
      eslintFix: {
        command: 'eslint --fix -c "<%= __cwd %>/.eslintrc.json"',
        options: __preferLocal
      },
      eslintFixDryRun: {
        command: 'eslint --fix-dry-run -c "<%= __cwd %>/.eslintrc.json"',
        options: __preferLocal
      },
      jsdoc: {
        command: 'rm -rf "<%= __cwd %>/jsdoc" && jsdoc -c "<%= __cwd %>/scripts/jsdoc-conf.js" "<%= __cwd %>"'
      },
      prepublish: {
        command: 'npm publish --dry-run'
      },
      pretest: {
        // TODO finish jsdocs and uncomment
        // command: 'grunt jsdoc && ' +
        command: 'babel "<%= __cwd %>/lib" --out-dir "<%= __cwd %>/dist" --minified --compact=true --no-comments && ' +
          'browserify -e "<%= __cwd %>/dist/racepacks.js" -o "<%= __cwd %>/dist/racepacks.bundle.js" -s' +
          ' racepacksBundled && ' +
          'node "<%= __cwd %>/scripts/dist-files-append-license.js"'
      }
    }
  })

  grunt.loadNpmTasks('grunt-shell')

  grunt.registerTask('default', ['shell:eslintFixDryRun'])
  grunt.registerTask('purge', ['shell:purge'])
  grunt.registerTask('eslintInit', ['shell:eslintInit'])
  grunt.registerTask('eslintFix', ['shell:eslintFix'])
  grunt.registerTask('eslintFixDryRun', ['shell:eslintFixDryRun'])
  grunt.registerTask('jsdoc', ['shell:jsdoc'])
  grunt.registerTask('prepublish', ['shell:prepublish'])
  grunt.registerTask('pretest', ['shell:pretest'])
}