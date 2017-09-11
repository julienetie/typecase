# type
Is a type helper library for managing all types.  

Types seem to be a very mis-understood subject in JavaScript and can sometimes be hard to manage.
**type** makes it easier to manage Javascript types without unecessary complexities. 

## Exist
```javascript
// Value is not null and not undefined.
type(value).exist
// Does not exist.
// !type(value).exist

```
## Empty
```javascript
// Value is not null, not undefined and not an emppty string ''.
type(value)empty
// Is not empty.
// !type(value).empty
```
## Zero
```javascript
// Value is not null, not undefined and not equal to 0.
type(value).zero
// Is not zero.
// !type(value).zero
```

## Type
typeIs allows you to see the type for what they are. If applicable, 
the object wrapper is shown by the prefix 'object'.

```javascript
type(value).<type>

// 'Hello World!' === 'string'
// 1000 === 'number'
// [1,2,3] === 'array'
// true === 'boolean'
// ()=>{} === 'function'
// Symbol('foo') === 'symbol'
// new Map()  === 'objectMap'
// new String() === 'objectString'
// new Boolean() === 'objectBoolean'
// new Array() === 'array'
// new WeakMap() === 'objectWeakMap'
// new Number() === 'objectNumber'
// new Function() === 'function'
// undefined === 'undefined'
// null === 'null'
// NaN === 'NaN'
// {} === 'object'
// document.createElement('div') === objectHTMLDivElement
// document.body === objectHTMLBodyElement
// <other objectObjects> === 'object'
```

## What this library is not

This library does not check if a value is an instance of another, use the instanceof operator
Simply check if an object is an element using:

```javascript 
someDOMElement instanceof Element // true
```
Alternatively..
```javascript 
 typeIs(someDOMElement).includes('Element') // true
```

typeIs does not aim to tell you the specific type of object it may be,
this is usually not important since you would likely need to check for 
existing properties, and if not then native properties will be sufficient.

For everything else, the native language should be more than sufficient.

## Explanation.
- Although Array is an object we return `'array'` rather than `'objectArray'` because it is not an intended object unlike i.e. `new Boolean()`. 
- `NaN` is an invalid type-of `'number'`, because this is problematic `'NaN'` is returned instead.
- `'objectObject'` is returned as `'object'` for simplicity.
- `null` is returned as a string of its self because ` typeof null // object` is problematic and a well known mistake.
- `'empty'` and `'zero'` also check for non-existence.

MIT (c) 2017 Julien Etienne.
