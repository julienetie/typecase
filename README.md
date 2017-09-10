# typeis
A tiny non-browser specific type library 

Types seem to be a very mis-understood subject in JavaScript.
Although there area a few flaws we tend to mistake many of the
advantages in JavaScript as flaws which is not always the case.
And even in cases where they are, it's quite easy to coerce for
better predictability.

This is not a one size fits all library, this is a helper for 
common usage with types. 

## Exist
```javascript
// Value is not null and not undefined.
typeIs(value, 'exist')
// Does not exist.
// !typeIs(value, 'exist')

```
## Empty
```javascript
// Value is not null, not undefined and not an emppty string ''.
typeIs(value, 'empty')
// Is not empty.
// !typeIs(value, 'empty')
```
## Zero
```javascript
// Value is not null, not undefined and not equal to 0.
typeIs(value, 'zero')
// Is not zero.
// !typeIs(value, 'zero')
```

## Type
typeIs allows you to see the type for what they are. If applicable, 
the object wrapper is shown by the prefix 'object'.

```javascript
typeIs(value)

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

This library does not check if a value is an instance of another.
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
- `null` is returned as a string of its self.
- `'empty'` and `'zero'` also check for non-existence.

MIT (c) 2017 Julien Etienne.
