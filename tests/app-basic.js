var should = require('should');

var user = {
	name: 'tj'
	, pets: ['tobi', 'loki', 'jane', 'bandit']
};

user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4);

// if the object was created with Object.create(null)
// then it doesn't inherit `Object` and have the `should` getter
// so you can do:

should(user).have.property('name', 'tj');
should(true).ok;

function someAsyncTask(foo, callback){
	callback(null,{bar:foo});
};

var mifoo = "jose";

someAsyncTask(mifoo, function(err, result){
	should.not.exist(err);
	should.exist(result);
	result.bar.should.equal(mifoo);
});

(5).should.be.exactly(5).and.be.a.Number;
(5).should.be.exactly(5).and.be.Number;

(6).should.not.be.exactly(5)