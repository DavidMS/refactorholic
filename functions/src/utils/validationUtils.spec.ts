import {expect} from "chai";
import {validateNotEmpty} from "./validationUtils";

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
