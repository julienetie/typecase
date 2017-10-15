import test from 'tape';
import { typecase } from '../src/typecase';

        const commonTypes = {
            string: 'Hello World!',
            number: 8,
            boolean: false,
            function: ()=>{},
            symbol: Symbol(),
            undefined: undefined,
            object: {},
            NaN: NaN,
            null: null,
            array: [],
            regExp: /abc/,
            objectString: new String(),
            objectNumber: new Number(),
            // objectBlob: new Blob(),   '// Cannot test blob "type" within node.
            objectBoolean: new Boolean(),
            objectDate: new Date(),
            objectMap: new Map(),
            objectWeakMap: new WeakMap(),
        };

// Each type is tested with a value that should pass true & false.
const number = 8;
const string = 'foo';
const noop = function() {};
const arrowNoop = () => {};

test('typecase: Should be a function.', t => {
    t.plan(1);
    t.equal(typeof typecase, 'function');
});

test('typecase: Should return a function.', t => {
    t.plan(1);
    t.equal(typeof typecase({}), 'function');
});

test('type: Should have an if method.', t => {
    const type = typecase({});
    t.plan(1);
    t.equal(typeof type.if, 'function');
});


// if
test('if: Returns given value for a matching type', t => {
    const type = typecase({
        errorHandlers: {
            string() {
                throw new Error()
            }
        }
    });
    t.plan(17);
    Object.keys(commonTypes).forEach(commonType =>{
    	switch(commonType){
    		case 'NaN':
    		const returnValue = type.if(commonTypes[commonType])[commonType];
    		t.equal(Object.is(returnValue, NaN), true);
    		break;	
    		default:
    		t.equal(type.if(commonTypes[commonType])[commonType], commonTypes[commonType]);
    	}
    });
});


// @@ Todo , this test is only testing callbacks against string and one against number. 
// Needs to be per type.
test('if: Should throw an error for an incorrect type match', t => {

	const errorHandlers = {};
	Object.keys(commonTypes).forEach(commonType =>{
		errorHandlers[commonType] = function(){ throw new Error(`The value is not of type ${commonType}`)}
	})


    const type = typecase({
        errorHandlers
    });
    t.plan(17);

    Object.keys(commonTypes).forEach(commonType =>{
    	if(commonType !== 'string'){
    		//String is incorrect
    	    t.throws(function() {type.if(string)[commonType]});
    	}else{
    		t.throws(function() {type.if(9).string});
    	}
    });
});

