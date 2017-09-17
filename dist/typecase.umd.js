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

function type(value) {
  var typeofWrapper = {
    string: false,
    number: false,
    boolean: false,
    function: false,
    symbol: false,
    undefined: false,
    object: false,
    NaN: false,
    null: false,
    array: false
  };

  var isNullorUndefined = value === null || value === undefined;

  // Check the value is not null or undefined.
  var states = {
    exist: !isNullorUndefined,
    empty: isNullorUndefined || value === '',
    zero: isNullorUndefined || value === 0
  };

  var assign = function assign(values) {
    return Object.assign(states, typeofWrapper, values);
  };

  var typeOfValue = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  // If type is a number, check if it is NAN or a valid number type.
  if (typeOfValue === 'number') {
    var typeOfNumber = Object.is(Number(value), NaN) ? 'NaN' : typeOfValue;
    var numberWrapper = {};
    numberWrapper[typeOfNumber] = true;
    return assign(numberWrapper);
  }

  // Check if the type is not an instance of Object. 
  // The constructor may still be an instance of Object e.g. String.
  if (typeOfValue !== 'object') {
    typeofWrapper[typeOfValue] = true;
    return assign(typeofWrapper);
  }

  // If value is null, for convenience return type as null.
  // Rather than objectNull.
  if (value === null) {
    var valueType = new String(value);
    valueType[valueType.valueOf()] = true;
    return assign(valueType);
  }

  // Check if value is an array as type 'array'.
  if (Array.isArray(value)) {
    var arrayWrapper = {};
    arrayWrapper.array = true;
    return assign(arrayWrapper);
  }

  // Get the object wrapper and valueOf type.
  var objectTypeDefinition = {}.toString.call(value);

  // Create the object name.
  var objectType = objectTypeDefinition.slice(0, objectTypeDefinition.length - 1).replace(/[\[\]\s]/g, '');

  var objectWrapper = {};
  var objectParam = objectType === 'objectObject' ? 'object' : objectType;
  objectWrapper[objectParam] = true;

  // Return the object<type> value if an object is wrapped by an object.
  return assign(objectWrapper);
}

return type;

})));
