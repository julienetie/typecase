# Typecase
<img src="http://oi63.tinypic.com/4j2544.jpg" width="300" text-align="center">

Typecase Is a tiny but powerful library that aims to provide a useful type of a given value. It is intended for standard dynamically typed JavaScript.

Types seem to be a commonly misunderstood subject in the world of JavaScript and can sometimes be difficult to manage even if you do understand it well. Typecase differentiates between differnt types from the perspective of the JavaScript language and common usage rather than other static typed languages.

## .true
```javascript
// Returns a Boolean of the expected value match.
type(value).true // true | false
```

## .false
```javascript
// Returns a Boolean of the expected value match.
type(value).false // true | false
```

## .exist
```javascript
// Value is not null and not undefined.
type(value).exist // OR !type(value).exist

```
## .empty
```javascript
// Value is not null, not undefined and not an emppty string ''.
type(value)empty // OR !type(value).empty
```
## .zero
```javascript
// Value is not null, not undefined and not equal to 0.
type(value).zero // OR !type(value).zero
```

## Types
typecase allows you to see types for what they are. When applicable, 
the object wrapper is shown by the prefix 'object'. Non standard types
(such as elements) will return undefined if the value is falsy. All other
types return boolean values.

```javascript 
type (<value>).<type> // true | false
```
```javascript
// Common types

// String
type('Hello World!').string
type(String()).string
type(new String()).objectString

// Number
type(1000).number
type(Number(1000)).number
type(new Number()).objectNumber

// Boolean
type(true).boolean
type(Boolean(true)).boolean
type(new Boolean()).objectBoolean

// Array
type([]).array
type(Array()).array
type(new Array()).array

// Function
type(()=>{}).function
type(function(){}).function
type(Function()).function
type(new Function()).function

// Date, Map, WeakMap, Symbol
type(new Date()).objectDate
type(Symbol('foo')).symbol
type(new Map()).objectMap
type(new WeakMap()).objectWeakMap

// RegExp
type(/Hello/).regExp
type(RegExp()).regExp
type(new RegExp()).regExp

// Null, undefined and NaN
type(undefined).undefined
type(null).null
type(NaN).NaN

// Objects 
type({}).object
type(<other objectObjects>).object

// Non-standard type examples
type(document.createElement('div')).objectHTMLDivElement    // true | undefined
type(document.body).objectHTMLBodyElement                   // true | undefined
...And so on.
```

## .some()
Returns true if at least one of the types validate as expected. If not returns false.
If the expected types are of an equivalent amount to the values supplied, each type
and value will be compared in order. If not they will be compared sporadically.

```javascript
type(value, value, value, value).some('string','objectDate', 'number', 'array')

type(value, value, value, value, value, value).some('string','objectDate')
```

## .every()
Returns true if all types validate as expected. If not returns false.
Values and expectedTypes must be of equal length.
```javascript
type(value, value, value, value).every('string','objectDate','true','false')
```

## .is
Reveals the type as a string.
```javascript
type(10000).is // "number"
```

## .raw (TBA)
Reveals the raw object-type without sugar coating as a string.
```javascript
type(null).raw // "[object Null]"
type(NaN).raw // "[object Number]"
```

## What this library is not

This library does not check if a value is an instance of another, use the instanceof operator:

```javascript 
someDOMElement instanceof Element // true
```
Alternatively (type check only)
```javascript 
 type(someDOMElement).is.includes('Element') // true
```


Typecase does not aim to tell you the specific "type" of sub-object it may contain,
this is usually not important since you would likely need to check for 
existing properties, and if not then native properties will be sufficient.

For everything else kind-of type related, the native language should be more than sufficient.

## Explanations.
- Although `Array` is an object `'array'` is returned rather than `'objectArray'` because it is not an intended object for `Object` use unlike i.e. `new Boolean()`. The same applies to RegExp.

- Although `NaN` is an invalid type-of `'number'`, because this is commonly problematic `'NaN'` is returned instead.
- `'objectObject'` is always returned as `'object'` for simplicity.
- `null` is returned as a string of it's self since` typeof null // object` is a historial mistake.
- `'empty'` and `'zero'` also check for non-existence.

MIT (c) 2017 Julien Etienne.
