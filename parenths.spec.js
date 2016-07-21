var test = require('tape');
var parenths = require('./parenths');

test('it should work', assert => {
  assert.plan(1);
  assert.ok(true);
});

test('it should match simple strings', assert => {
  var test = '()';
  var ACTUAL = parenths(test);
  var EXPECTED = true;
  assert.equal(ACTUAL, EXPECTED, 'matches single pair');


  test = '[]';
  ACTUAL = parenths(test);
  EXPECTED = true;
  assert.equal(ACTUAL, EXPECTED, 'matches single pair');

  assert.end();
});


test('it should match nested strings', assert => {
  var test = '([])';
  var ACTUAL = parenths(test);
  var EXPECTED = true;
  assert.equal(ACTUAL, EXPECTED, 'matches nested pairs');


  test = '({[]})';
  ACTUAL = parenths(test);
  EXPECTED = true;
  assert.equal(ACTUAL, EXPECTED, 'matches nested pairs');

  assert.end();
});

test('it should match consecutive pairs', assert => {
  var test = '()[]{}';
  var ACTUAL = parenths(test);
  var EXPECTED = true;
  assert.equal(ACTUAL, EXPECTED, 'matches subsequent pairs');

  assert.end();
});


test('it should fail a mis-matched pair', assert => {
  var test = '(]';
  var ACTUAL = parenths(test);
  var EXPECTED = false;
  assert.equal(ACTUAL, EXPECTED, 'fails a mis-matched pair');

  assert.end();
});

test('it should fail unclosed opens', assert => {
  var test = '((';
  var ACTUAL = parenths(test);
  var EXPECTED = false;
  assert.equal(ACTUAL, EXPECTED, 'fails an unclosed open');

  assert.end();
});
