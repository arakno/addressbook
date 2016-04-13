/*
var assert = require("assert");
var should = require("chai").should();
var expect = require("chai").expect;	

var request = require("request"),
    base_url = "http://localhost:3000/api/getcountries";
	
	
var app = require("main.js").App.init();

console.log(app);
*/
describe('Tests DOM  - login form', function() {
      var formElem = document.forms[0];
      var submit = document.getElementById('submit');

      it('has a form', function() {
        expect(formElem).to.not.equal(null);
      });

      it('input field is of type email', function() {
        expect(formElem.email.getAttribute('type')).to.equal('email');
      });

      it('submit button has the right text', function() {
        expect(submit.innerHTML).to.equal('submit');
      });
    });
	

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    })
  })
})

describe('After this', function() {
  it('should be on home page with list of contacts', function(done) {
    expect($('#listView')).to.exist;
    done();
  });
});

//Tests API
/*
describe("Hello World Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        //expect(response.statusCode).toBe(200);
        assert.equal(200, response.statusCode);
        done();
      });
    });

    it("returns list of countries", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(body).toBe([Object]);
        app.closeServer();
        done();
      });
    });
  });
});
*/

describe('Array', function(){
  describe('#pop()', function(){
    it('should remove and return the last value', function(){
      var arr = [1,2,3];
      assert(arr.pop() == 3);
      assert(arr.pop() == 2);
      assert(arr.pop() == 1);
    })

    it('should adjust .length', function(){
      var arr = [1,2,3];
      arr.pop();
      assert(arr.length == 2);
    })
  })
})