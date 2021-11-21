const { expect } = require("@jest/globals");
const { encAtbash } = require("../encAtbash");

describe('Check encrypt Atbash', () => {
  test('should Atbash for encrypt letter A', () => {
    expect(encAtbash('A')).toEqual('Z');
  });
  test('should Atbash for encrypt letter z', () => {
    expect(encAtbash('z')).toEqual('a');
  });
  test('should Atbash for encrypt letter b', () => {
    expect(encAtbash('b')).toEqual('y');
  });
  test('should Atbash for encrypt letter Y', () => {
    expect(encAtbash('Y')).toEqual('B');
  });
});
