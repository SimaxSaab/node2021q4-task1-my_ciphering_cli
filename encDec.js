'use strict';

function encrypt(str, offset) {
  let out = '';
  for(let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    let codeNew = code + offset;
    if(offset > 0) {
      if(code >= 97) {
        if(codeNew > 122) {
          codeNew = 97 + codeNew - 123;
        }
      } else if(code >= 65) {
        if(codeNew > 90) {
          codeNew = 65 + codeNew - 91;
        }
      }
    } else if(offset < 0) {
      if(code <= 90) {
        if(codeNew < 65) {
          codeNew = 91 + codeNew - 65;
        }
      } else if(code <= 122) {
        if(codeNew < 97) {
          codeNew = 123 + codeNew - 97;
        }
      }
    }
    out += String.fromCharCode(codeNew);
  }
  return out;
}

module.exports.encrypt = encrypt;
