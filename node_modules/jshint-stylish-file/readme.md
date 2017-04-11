# jshint-stylish-file [![Build Status](https://travis-ci.org/ackellyb/jshint-stylish-file.svg?branch=master)](https://travis-ci.org/sindresorhus/jshint-stylish)

> Stylish reporter for [JSHint](https://github.com/jshint/jshint)

A shameless rip of the original [JSHint-Stylish](https://github.com/sindresorhus/jshint-stylish). I had need to send output to both Console and a file while using Gulp. The file output is a very barebones version on the consolout put. No colours or icons. 
## Install

```
$ npm install --save-dev jshint-stylish-file
```
## Options

#### beep

Type: `boolean`<br>
Default: `false`

The system bell will make a sound if there were any warnings or errors.

#### output
Type: `string`<br>
Default: `undefined`

The file to write to.

## Example

```js
gulp.task('default', () =>
	gulp.src(['file.js'])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish', {beep: true, output: 'report/report.txt' }))
);
```

## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
