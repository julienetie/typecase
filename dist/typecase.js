// https://github.com/julienetie/typecase
// (c) Julien Etienne 2017
// A type checker for dynamically typed JavaScript
// @Update comments, 
function type(...values) {
    const value = values[0];

    // Wrapper to store the .is parameter.
    const isValue = {};

    // Default falsy validations for common types.
    const commonTypes = {
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
    const isNullorUndefined = value === null || value === undefined;

    // Queries the values state for common usage.
    const states = {
        exist: !isNullorUndefined,
        empty: isNullorUndefined || value === '',
        zero: isNullorUndefined || value === 0,
        true: !!value === true,
        false: !!value === false
    };

    // Methods to expose for mulit values.
    const methods = values.length > 1 ? {
        every(...expectedTypes) {
            if (values.length !== expectedTypes.length) {
                console.error('typecase type(): Values and expectedTypes must be of equal length');
            }

            return values.every((value, i) => type(value)[expectedTypes[i]]);
            //console.log(expectedTypes);
        },
        some(...expectedTypes) {
            return values.some((value, i) => {
                if (expectedTypes.length < values.length) {
                    return expectedTypes.some(expectedType => type(value)[expectedType]);
                }
                return type(value)[expectedTypes[i]];
            });
            //console.log(expectedTypes);
        }
    } : {};

    // Writes value/s over defaults.
    // In order.
    const assign = values => Object.assign(states, commonTypes, isValue, methods, values);

    // Checks the typeof value.
    const typeOfValue = typeof value;

    // If type is a number, check if it is NAN or a valid number type.
    if (typeOfValue === 'number') {
        const typeOfNumber = Object.is(Number(value), NaN) ? 'NaN' : typeOfValue;
        const numberWrapper = {};
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
        const valueType = new String(value);
        const nullString = valueType.valueOf();
        isValue.is = nullString;
        valueType[nullString] = true;
        return assign(valueType);
    }

    // Check if value is an array as type 'array'.
    if (Array.isArray(value)) {
        const arrayWrapper = {};
        isValue.is = 'array';
        arrayWrapper.array = true;
        return assign(arrayWrapper);
    }

    // Get the object wrapper and valueOf type.
    const objectTypeDefinition = {}.toString.call(value);

    // Create the object name
    // Simplifies objectObject as object.


    const objectType = objectTypeDefinition.slice(0, objectTypeDefinition.length - 1).replace(/[\[\]\s]/g, '');

    // An empty object to challenge the existing defaults.
    const objectWrapper = {};

    // Return regExp rather than objectRegExp.
    if (objectType === 'objectRegExp') {
        isValue.is = 'regExp';
        objectWrapper.regExp = true;
        return assign(objectWrapper);
    }

    // Return the object<type> value if an object is wrapped by an object.
    const objectParam = objectType === 'objectObject' ? 'object' : objectType;
    isValue.is = objectParam;
    objectWrapper[objectParam] = true;
    return assign(objectWrapper);
}

export default type;
