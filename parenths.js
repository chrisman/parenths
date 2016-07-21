var fs  = require("fs");

var brackets = {
  '(': ')',
  '[': ']',
  '{': '}'
};

var has = (arr) => (elem) => arr.indexOf(elem) >= 0;

var openers = Object.keys(brackets);
var closers = openers.map(x => brackets[x]);

var is_opener = has(openers);
var is_closer = has(closers);

var parenths = (line) => {

  var chars = line.split('');

  // edge cases
  if (
    chars.every(c => is_opener(c))    // all openers
    || chars.every(c => is_closer(c)) // all closers
  ) {
    return false;
  }

  var stack = [];
  var result = true;

  chars.forEach(c => {
    if (is_opener(c)) {
      stack.push(brackets[c]);
    } else if (is_closer(c)) {
      if (c !== stack.pop()) {
        result = false;
      }
    }
  });

  return result;
}

fs.readFileSync(process.argv[2])
.toString()
.split('\n')
.forEach(line => {
  console.log(line, parenths(line));
});

module.exports = parenths;
