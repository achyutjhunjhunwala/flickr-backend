'use strict';

var _sanitizeObject = require('./sanitizeObject');

var _sanitizeObject2 = _interopRequireDefault(_sanitizeObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sanitizeObject Spec', () => {
  test('sanitizeObject: should sanitize object by removing `undefined` properties', () => {
    const objectToSanitize = {
      a: 1,
      b: undefined
    };

    expect((0, _sanitizeObject2.default)(objectToSanitize)).toEqual({
      a: 1
    });
  });
});