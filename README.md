# typecase
Is a helper library that provides the correct type of a value for standard dynamically JavaScript.  

Types seem to be a very mis-understood subject in the world of JavaScript and can sometimes be difficult to manage even if you understand it well. Typecase differentiates between differnt types from the perspective of the JavaScript language and common usage rather than another static typed language which does not correlate at all.

## .exist
```javascript
// Value is not null and not undefined.
type(value).exist
// Does not exist.
// !type(value).exist

```
## .empty
```javascript
// Value is not null, not undefined and not an emppty string ''.
type(value)empty
// Is not empty.
// !type(value).empty
```
## .zero
```javascript
// Value is not null, not undefined and not equal to 0.
type(value).zero
// Is not zero.
// !type(value).zero
```

## Type
typecase allows you to see types for what they are. When applicable, 
the object wrapper is shown by the prefix 'object'. Non standard types
(such as elements) will return undefined if the value is falsy. All other
types return boolean values.

```javascript 
type (<value>).<type> === true | false
```
```javascript


type('Hello World!').string
type(1000).number
type([1,2,3]).array
type(true).boolean
type(()=>{}).function
type(Symbol('foo')).symbol
type(new Map()).objectMap
type(new String()).objectString
type(new Boolean()).objectBoolean
type([]).array
type(new Array()).array
type(new WeakMap()).objectWeakMap
type(new Number()).objectNumber
type(new Function()).function
type(undefined).undefined
type(null).null
type(NaN).NaN
type({}).object
type(document.createElement('div')).objectHTMLDivElement    // true | undefined
type(document.body).objectHTMLBodyElement                   // true | undefined
type(<other objectObjects>).object
```

## What this library is not

This library does not check if a value is an instance of another, use the instanceof operator:

```javascript 
someDOMElement instanceof Element // true
```
Alternatively..
```javascript 
 typeIs(someDOMElement).includes('Element') // true
```


typeIs does not aim to tell you the specific "type" of sub-object it may contain,
this is usually not important since you would likely need to check for 
existing properties, and if not then native properties will be sufficient.

For everything else kind-of type related, the native language should be more than sufficient.

## Explanations.
- Although Array is an object we return `'array'` rather than `'objectArray'` because it is not an intended object for `Object` use unlike i.e. `new Boolean()`. 
- Although `NaN` is an invalid type-of `'number'`, because this is problematic `'NaN'` is returned instead.
- `'objectObject'` is returned as `'object'` for simplicity.
- `null` is returned as a string of its self because ` typeof null // object` is a historial mistake.
- `'empty'` and `'zero'` also check for non-existence.

MIT (c) 2017 Julien Etienne.
