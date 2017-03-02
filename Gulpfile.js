var gulp = require('gulp');
var args = require('yargs').argv;
var mocha =  require('gulp-mocha');
var util = require('gulp-util');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var sonar = require('gulp-sonar');
var checkstyleReporter = require('gulp-jshint-checkstyle-reporter');

var $ = require('gulp-load-plugins')({lazy: true});

//var jshint = require('gulp-jshint');
//var jscs = require('gulp-jscs');
//var gulpif = require('gulp-if');
//var gulpprint = require('gulp-print');
//var util = require('gulp-util');


//gulp.task('test', function () {
  //  return gulp.src(['test/**/*.js'], { read: false })
  //      .pipe(mocha({ reporter: 'spec' }))
 //       .on('error', util.log);
//});

gulp.task('lint', function() {
  return  gulp.src([
    'app/**/*.js',
    'test/**/*.js'
    ,'*.js'
  ])
    .pipe(jshint())
   //.pipe(checkstyleReporter())
   //     .pipe(gulp.dest('target/checkstyle-reports'));
    .pipe(jshint.reporter('gulp-jshint-html-reporter', {
      filename: 'jshint-report' + '/jshint-output.html',
     createMissingFolders : true  
    }
));
});


 
gulp.task('mocha', function () {
    return gulp.src('test/functional/home.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha({reporter: 'good-mocha-html-reporter', //good-mocha-html-reporter, spec, nyan
    timeout: 15000,
    bail: false,
    savePath: 'mocha-report', // the path to desired location
    filename: 'report.html', // filename gets attached at the end of savePath
    mode: 'Verbose'}));
});

gulp.task('test4', function (cb) {
  gulp.src(['app/**/*.js', '*.js'])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src(['test/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports()) // Creating the reports after tests ran
       // .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } })) // Enforce a coverage of at least 90%
        .on('end', cb);
    });
});

gulp.task('sonar', function () {
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

		  return gulp.src('server.js', { read: false })
        .pipe(sonar(options))
        .on('error', util.log);
});


gulp.task('pre-test', function () {
  return gulp.src(['app/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Write the covered files to a temporary directory
    .pipe(gulp.dest('test-tmp/'));
});
gulp.task('test3',['pre-test'], function () {
  //  return gulp.src(['test/**/*.js'])
    //    .pipe(mocha({ reporter: 'spec' }))
      //  .on('error', function () {
	return gulp.src('test/**/*.js')
          .pipe(mocha({reporter: 'spec'}))
          .pipe(istanbul.writeReports({
            dir: './assets/unit-test-coverage',
            reporters: [ 'lcov' ],
            reportOpts: { dir: './assets/unit-test-coverage'}
        }));
	//});
});



gulp.task('test', ['pre-test'], function () {
  // Make sure your tests files are requiring files from the
  // test-tmp/ directory
  return gulp.src(['test/**/*.js'])
    .pipe(testFramework())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports());
});

//gulp.task('test2', function () {
  //  .pipe(istanbul({includeUntested: true}))
  //  .on('finish', function () {
  //     return gulp.src(['test/**/*.js'], { read: false })
    //      .pipe(mocha({reporter: 'spec'}))
   //       .pipe(istanbul.writeReports({
   //         dir: './assets/unit-test-coverage',
  //          reporters: [ 'lcov' ],
 //           reportOpts: { dir: './assets/unit-test-coverage'}
//        }));
//    });
//});
 
gulp.task('watch-test', function () {
    gulp.watch(['public/**', 'app/**', 'node_modules', 'test/**'], ['test']);
});

gulp.task('vet', function () {
    log('Analzing source with JSHint and JSCS');
    
	return gulp
        .src([
            './src/**/*.js',
            './*.js'
        ])
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jscs())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}));
      //  .pipe($.jshint.reporter('fail'));
});

///////////

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if(msg.hasOwnProperty(item))
                $.util.log($.util.colors.blue(msg[item]));
        }
    }
 else {
    $.util.log($.util.colors.blue(msg));
    }
}

gulp.task('default',['test4','lint','mocha']);
    
