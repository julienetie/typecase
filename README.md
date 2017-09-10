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
// undefined === 'undefined'
// null === 'null'
// NaN === 'NaN'
// {} === 'object'
// <All other objects> === 'object'
```
