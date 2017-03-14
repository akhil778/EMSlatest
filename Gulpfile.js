var config = require('./config/variables.js')


//Generate report for syntax checking
config.gulp.task('lint', function() {
  return  config.gulp.src([
    'app/**/*.js'
  ])
    .pipe(config.jshint())
    .pipe(config.jshint.reporter('gulp-jshint-html-reporter', {
      filename: 'jshint-report' + '/jshint-output.html',
     createMissingFolders : true  
    }
));
});

// Generate the code coverage report for the code
config.gulp.task('mocha', function () {
    return config.gulp.src('app/test/functional/home.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(config.mocha({reporter: 'good-mocha-html-reporter', //good-mocha-html-reporter, spec, nyan
    timeout: 15000,
    bail: false,
    savePath: 'mocha-report', // the path to desired location
    filename: 'report.html', // filename gets attached at the end of savePath
    mode: 'Verbose'}));
});

//Takes the test file and generate test passed/failed report for the files mentioned
config.gulp.task('test', function (cb) {
  config.gulp.src(['app/**/*.js', '*.js'])
    .pipe(config.istanbul()) // Covering files
    .pipe(config.istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      config.gulp.src(['app/test/**/*.js'])
        .pipe(config.mocha())
        .pipe(config.istanbul.writeReports()) // Creating the reports after tests ran
       // .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90%
        .on('end', cb);
    });
});

//Generate code coverage report for Gulp
config.gulp.task('sonar', function () {
    var options = {
        sonar: {
            host: {
                url: 'http://localhost:9080'
            },
            jdbc: {
                url: 'jdbc:mysql://localhost:3306/sonar',
                username: 'sonar',
                password: 'sonar'
            },
            projectKey: 'sonar:my-project:1.0.0',
            projectName: 'My Project',
            projectVersion: '1.0.0',
            // comma-delimited string of source directories 
            sources: 'app/controllers/home.js',
            language: 'js',
            sourceEncoding: 'UTF-8',
            javascript: {
                lcov: {
                    reportPath: 'test/sonar_report/lcov.info'
                }
            },
            exec: {
                // All these properties will be send to the child_process.exec method (see: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback ) 
                // Increase the amount of data allowed on stdout or stderr (if this value is exceeded then the child process is killed, and the gulp-sonar will fail). 
                maxBuffer : 1024*1024
            }
        }
    };

		  return config.gulp.src('server.js', { read: false })
        .pipe(config.sonar(options))
        .on('error', config.util.log);
});

//watches the files continuously mentioned in it
config.gulp.task('watch', function () {
    config.gulp.watch(['app\public\views\home.html'])
        .on('change',config.browserSync.reload);
});

//call the below mentioned task together
config.gulp.task('default',['test','lint','mocha','sonar','watch']);
    





