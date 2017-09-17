(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.typecase = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

// https://github.com/julienetie/typecase
// (c) Julien Etienne 2017
// A type checker for dynamically typed JavaScript
// @Update comments, 
function type() {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
    }

    var value = values[0];

    // Wrapper to store the .is parameter.
    var isValue = {};

    // Default falsy validations for common types.
    var commonTypes = {
        string: false,
        number: false,
        boolean: false,
        function: false,
        symbol: false,
        undefined: false,
        object: false,
        NaN: false,
        null: false,
        array: false,
        regExp: false,
        objectString: false,
        objectNumber: false,
        objectBoolean: false,
        objectDate: false,
        objectMap: false,
        objectWeakMap: false
    };

    // Checks existance.
    var isNullorUndefined = value === null || value === undefined;

    // Queries the values state for common usage.
    var states = {
        exist: !isNullorUndefined,
        empty: isNullorUndefined || value === '',
        zero: isNullorUndefined || value === 0,
        true: !!value === true,
        false: !!value === false
    };

    // Methods to expose for mulit values.
    var methods = values.length > 1 ? {
        every: function every() {
            for (var _len2 = arguments.length, expectedTypes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                expectedTypes[_key2] = arguments[_key2];
            }

            if (values.length !== expectedTypes.length) {
                console.error('typecase type(): Values and expectedTypes must be of equal length');
            }

            return values.every(function (value, i) {
                return type(value)[expectedTypes[i]];
            });
            //console.log(expectedTypes);
        },
        some: function some() {
            for (var _len3 = arguments.length, expectedTypes = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                expectedTypes[_key3] = arguments[_key3];
            }

            return values.some(function (value, i) {
                if (expectedTypes.length < values.length) {
                    return expectedTypes.some(function (expectedType) {
                        return type(value)[expectedType];
                    });
                }
                return type(value)[expectedTypes[i]];
            });
            //console.log(expectedTypes);
        }
    } : {};

    // Writes value/s over defaults.
    // In order.
    var assign = function assign(values) {
        return Object.assign(states, commonTypes, isValue, methods, values);
    };

    // Checks the typeof value.
    var typeOfValue = typeof value === 'undefined' ? 'undefined' : _typeof(value);

    // If type is a number, check if it is NAN or a valid number type.
    if (typeOfValue === 'number') {
        var typeOfNumber = Object.is(Number(value), NaN) ? 'NaN' : typeOfValue;
        var numberWrapper = {};
        isValue.is = typeOfNumber;
        numberWrapper[typeOfNumber] = true;
        return assign(numberWrapper);
    }

    // Check if the type is not an instance of Object. 
    // The constructor may still be an instance of Object e.g. String.
    if (typeOfValue !== 'object') {
        isValue.is = typeOfValue;
        commonTypes[typeOfValue] = true;
        return assign(commonTypes);
    }

    // If value is null, for convenience return type as null.
    // Rather than objectNull.
    if (value === null) {
        var valueType = new String(value);
        var nullString = valueType.valueOf();
        isValue.is = nullString;
        valueType[nullString] = true;
        return assign(valueType);
    }

    // Check if value is an array as type 'array'.
    if (Array.isArray(value)) {
        var arrayWrapper = {};
        isValue.is = 'array';
        arrayWrapper.array = true;
        return assign(arrayWrapper);
    }

    // Get the object wrapper and valueOf type.
    var objectTypeDefinition = {}.toString.call(value);

    // Create the object name
    // Simplifies objectObject as object.


    var objectType = objectTypeDefinition.slice(0, objectTypeDefinition.length - 1).replace(/[\[\]\s]/g, '');

    // An empty object to challenge the existing defaults.
    var objectWrapper = {};

    // Return regExp rather than objectRegExp.
    if (objectType === 'objectRegExp') {
        isValue.is = 'regExp';
        objectWrapper.regExp = true;
        return assign(objectWrapper);
    }

    // Return the object<type> value if an object is wrapped by an object.
    var objectParam = objectType === 'objectObject' ? 'object' : objectType;
    isValue.is = objectParam;
    objectWrapper[objectParam] = true;
    return assign(objectWrapper);
}

return type;

})));
