// eslint-disable-next-line spaced-comment
/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';


function stmt1(f) {
  return (String(f).split(/\{\s+/)[1] || '').split(/\s+/)[0];
}

function checkFunc(func, nArgs, stmt1ex) {
  return (func && (func.length === nArgs) && (stmt1(func) === stmt1ex));
}


function findSafeLoadFunc() {
  var lib = require('js-yaml'), sl = lib.safeLoad, ld = lib.load;

  // ["Why not check the major version number?"](docs/why_not_major_version.md)

  if (checkFunc(sl, 2, 'return')) { return sl; }
  if (checkFunc(sl, 0, 'throw') && checkFunc(ld, 2, 'return')) { return ld; }
  if (checkFunc(sl, 0, 'throw') && checkFunc(ld, 2, 'var')) { return ld; }

  (function fail() {
    var msg = 'YAML library has an unexpected, unsupported API.',
      funcNames = ['load', 'safeLoad'];
    funcNames.forEach(function (funcName) {
      var code = String(lib[funcName]).replace(/\s+/g, ' ');
      msg += '\n\tHint: ' + funcName + ' = «' + code.slice(0, 64);
      if (code.length > 64) { msg += '…'; }
      msg += '» stmt1=' + stmt1(code);
    });
    throw new Error(msg);
  }());
}

module.exports = findSafeLoadFunc();
