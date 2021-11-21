const { expect } = require("@jest/globals");
const { encrypt } = require("../encDec");

describe('Check encrypt Cesar', () => {
  test('should Cesar for encrypt letter A', () => {
    expect(encrypt('A', 1)).toEqual('B');
  });
  test('should Cesar for encrypt letter a', () => {
    expect(encrypt('a', 1)).toEqual('b');
  });
  test('should Cesar for encrypt letter z', () => {
    expect(encrypt('z', 1)).toEqual('a');
  });
  test('should Cesar for encrypt letter Z', () => {
    expect(encrypt('Z', 1)).toEqual('A');
  });
  test('should ROT-8 for encrypt letter a', () => {
    expect(encrypt('a', 8)).toEqual('i');
  });
  test('should ROT-8 for encrypt letter W', () => {
    expect(encrypt('Z', 8)).toEqual('H');
  });
});

describe('Check decrypt Cesar', () => {
  test('should Cesar for decrypt letter B', () => {
    expect(encrypt('B', -1)).toEqual('A');
  });
  test('should Cesar for decrypt letter a', () => {
    expect(encrypt('a', -1)).toEqual('z');
  });
  test('should Cesar for decrypt letter A', () => {
    expect(encrypt('A', -1)).toEqual('Z');
  });
  test('should ROT-8 for decrypt letter i', () => {
    expect(encrypt('i', -8)).toEqual('a');
  });
  test('should ROT-8 for decrypt letter i', () => {
    expect(encrypt('B', -8)).toEqual('T');
  });
  test('should ROT-8 for decrypt letter H', () => {
    expect(encrypt('H', -8)).toEqual('Z');
  });
});
