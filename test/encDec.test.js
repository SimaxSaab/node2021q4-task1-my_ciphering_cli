const { expect } = require("@jest/globals");
const { encrypt, decrypt } = require("../encDec");

describe('Check encrypt', () => {
  test('should', () => {
    expect(encrypt('A', 1)).toEqual('B');
  });
});
