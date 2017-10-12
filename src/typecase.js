// https://github.com/julienetie/typecase
// (c) Julien Etienne 2017
// A type checker for dynamically typed JavaScript

const main = (typeIf, config) => {
    const configIsAnObject = typeof config === 'object';
    const errorHandlers = configIsAnObject ? config.errorHandlers : {};

    const type = (...values) => {
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
            objectBlob: false,
            objectBoolean: false,
            objectDate: false,
            objectMap: false,
            objectWeakMap: false,
        };


        // Checks existance.
        const isNullorUndefined = value === null || value === undefined;

        // Get the object wrapper and valueOf type.
        const getObjectTypeDefinition = (value) => ({}).toString.call(value);

        // Queries the values state for common usage.
        const states = {
            exist: !isNullorUndefined,
            empty: isNullorUndefined || value === '',
            zero: isNullorUndefined || value === 0 || Object.is(value, NaN), // NAN
            true: value === true,
            false: value === false,
            raw: getObjectTypeDefinition(value)
        };


        // Methods to expose for mulit values.
        const methods = values.length > 1 ? {
            every(...expectedTypes) {
                if (values.length !== expectedTypes.length) {
                    console.error('typecase type(): Values and expectedTypes must be of equal length');
                }
                const allValuesMatch = values.every((value, i) => type(value)[expectedTypes[i]]);
                const hasEveryErrorHandler = errorHandlers.hasOwnProperty('every');

                if(typeIf && allValuesMatch){
                  return values;
                }

                if(typeIf && !allValuesMatch && hasEveryErrorHandler){
                  errorHandlers.every();
                  return [];
                }

                if(typeIf && !allValuesMatch && !hasEveryErrorHandler){
                  return [];
                }

                return allValuesMatch;
            },
            some(...expectedTypes) {
                return values.some((value, i) => {
                    if (expectedTypes.length < values.length || expectedTypes.length > values.length) {
                        return expectedTypes.some(expectedType => type(value)[expectedType]);
                    }
                    const someValuesMatch = type(value)[expectedTypes[i]];
                    const hasSomeErrorHandler = errorHandlers.hasOwnProperty('some');

                    if(typeIf && someValuesMatch){
                      return values;
                    }

                    if(typeIf && !someValuesMatch && hasSomeErrorHandler){
                      errorHandlers.some();
                      return [];
                    }

                    if(typeIf && !someValuesMatch && !hasEveryErrorHandler){
                      return [];
                    }

                    return someValuesMatch;
                });
                //console.log(expectedTypes);
            }
        } : {};


        // Writes value/s over defaults.
        // In order.
        const assign = values => Object.assign(
            states,
            commonTypes,
            isValue,
            methods,
            values
        );


        // Checks the typeof value.
        const typeOfValue = typeof value;


        // If type is a number, check if it is NAN or a valid number type.
        if (typeOfValue === 'number') {
            const typeOfNumber = Object.is(Number(value), NaN) ? 'NaN' : typeOfValue;
            const numberWrapper = {};
            isValue.is = typeOfNumber;
            numberWrapper[typeOfNumber] = true;
            const typeIfConfig = Object.assign({},errorHandlers, { number: value });
            return typeIf ? typeIfConfig : assign(numberWrapper);
        }


        // Check typeof value is not an object. 
        // The constructor may still be an instance of Object e.g. String.
        if (typeOfValue !== 'object') {
            isValue.is = typeOfValue;
            commonTypes[typeOfValue] = true;
            const wrapper = {};
            wrapper[typeOfValue] = value;
            const typeIfConfig = Object.assign({},errorHandlers, wrapper);
            return typeIf ? typeIfConfig : assign(commonTypes);
        }


        // If value is null, for convenience return type as null.
        // Rather than objectNull.
        if (value === null) {
            const valueType = new String(value);
            const nullString = valueType.valueOf();
            isValue.is = nullString;
            valueType[nullString] = true;
            const typeIfConfig = Object.assign({},errorHandlers, { null: value });
            return typeIf ? typeIfConfig : assign(valueType);
        }


        // Check if value is an array as type 'array'.
        if (Array.isArray(value)) {
            const arrayWrapper = {};
            isValue.is = 'array';
            arrayWrapper.array = true;
            const typeIfConfig = Object.assign({},errorHandlers, { array: value });
            return typeIf ? typeIfConfig : assign(arrayWrapper);
        }


        const objectTypeDefinition = getObjectTypeDefinition(value);
        // Create the object name
        // Simplifies objectObject as object.
        const objectType = objectTypeDefinition
            .slice(0, objectTypeDefinition.length - 1)
            .replace(/[\[\]\s]/g, '');


        // An empty object to challenge the existing defaults.
        const objectWrapper = {};


        // Return regExp rather than objectRegExp.
        if (objectType === 'objectRegExp') {
            isValue.is = 'regExp';
            objectWrapper.regExp = true;
            const typeIfConfig = Object.assign({},errorHandlers, { regExp: value });          
            return typeIf ? typeIfConfig : assign(objectWrapper);
        }


        // Return the object<type> value if an object is wrapped by an object.
        const objectParam = objectType === 'objectObject' ? 'object' : objectType;
        isValue.is = objectParam;
        objectWrapper[objectParam] = true;
        const wrapper = {};
        wrapper[objectParam] = value;
        const typeIfConfig = Object.assign({},errorHandlers, wrapper);        
        return typeIf ? typeIfConfig : assign(objectWrapper);
    }
    return type;
}


// Standard type and type.if functions without config.
const type = (...values) => main(false, false)(...values);
type.if = (...values) => main(true, false)(...values);

// Config setups for type and type.if functions.
const typeCase = config => {
    const typeCase = (...values) => main(false, config)(...values);
    typeCase.if = (...values) => main(true, config)(...values);
    return typeCase;
}

export {
  type,
  typeCase
};