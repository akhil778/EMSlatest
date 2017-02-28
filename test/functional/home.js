//var starWars = require('./index');
var expect = require('chai').expect;
var assert = require('chai').assert;	
 
describe('Home page', function () {
    it('should load the page properly');
    it('should navigate to login');
    it('should navigate to sign up');
    it('should load analytics');
	
});

describe('starwars-names',function() {
	it('should work!', function(){
		expect(true).to.be.true;
	});
	it('should work second!', function(){
		expect('hello').to.equal('hello');
	});
	it('should work third!', function(){
		assert.equal(3, '3', '== coerces values to strings');
	});
	it('should work fourth!', function(){
		assert.equal(5, 5, '5 is strictly greater than 2');
	});
	it('should work fifth!', function(){
		assert.isOk('everything', 'everything is ok');
	});
});