'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createRenderer = exports.createRenderer = function createRenderer(fnc) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$propName = _ref.propName,
      propName = _ref$propName === undefined ? 'render' : _ref$propName;

  return function (props) {
    return props[propName](fnc(props));
  };
};

exports.default = createRenderer;