// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

function primitiveType(obj, arrObj) { //arrObj is a true/false denoting whether it is an Arr/Obj or primitive value
  // let comma = (outputString.length === 0) ? '' : ',';
  return (typeof obj === 'string' && !arrObj) ? '"' + obj + '"' : '' + obj;
}

function comma(string) {
  return (string.length === 0) ? '' : ',' ;
}

var stringifyJSON = function(obj) {
  let outputString = '';
  if (typeof obj === 'object') {
    if (obj === null) return 'null';
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      for (let i = 0; i < obj.length; i++) {
        if (typeof obj[i] === 'object') {
          outputString += comma(outputString) + primitiveType(stringifyJSON(obj[i]), true);
        } else {
          outputString += comma(outputString) + primitiveType(obj[i], false);
        }
      }
      return '[' + outputString + ']';
    } else {
      for (let key in obj) {
        let keyString = '"' + key + '":';
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          outputString += comma(outputString) + keyString + primitiveType(stringifyJSON(obj[key]), true);
        } else if (typeof obj[key] === 'function' || typeof obj[key] === 'undefined') {
          outputString += '';
        } else {
          outputString += comma(outputString) + keyString + primitiveType(obj[key], '', false);
        }
      }
      return '{' + outputString + '}';
    }
  } else {
    outputString += comma(outputString) + primitiveType(obj, false);
  }
  return outputString;
};