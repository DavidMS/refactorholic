import {expect} from "chai";
import {validateNotBlank, validateNotEmpty} from "./validationUtils";

const ERROR_SUPPLIER = () => new Error();

describe('validateNotEmpty()', () => {

  [
    ['not empty', 'a non-empty string'],
    [[1, 2], 'a non-empty array']
  ].forEach(([input, description]) => {
    it(`should not throw if the input is ${description}`, function () {
      expect(() => validateNotEmpty(input, ERROR_SUPPLIER)).not.to.throw();
    });
  });

  [
    ['', 'an empty string'],
    [[], 'an empty array'],
    [null, 'null'],
    [undefined, 'undefined']
  ].forEach(([input, description]) => {
    it(`should throw if the input is ${description}`, function () {
      // Given
      const error = new Error();

      // When
      expect(() => validateNotEmpty(input, () => error)).to.throw(error);
    });
  });
});

describe('validateNotBlank()', () => {

  it('should not throw if the input is not empty', function () {
    expect(() => validateNotBlank('not an empty string', ERROR_SUPPLIER)).not.to.throw();
  });

  [
    ['', 'an empty string'],
    ['  ', 'a string with spaces'],
    ['\t\t', 'a string with tabulators'],
    ['\n\n', 'a string with line breaks'],
    [null, 'null'],
    [undefined, 'undefined'],
  ].forEach(([input, description]) => {
    it(`should throw if the input is ${description}`, function () {
      // Given
      const error = new Error();

      // When
      expect(() => validateNotBlank(input, () => error)).to.throw(error);
    });
  });
});
