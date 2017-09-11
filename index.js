function type(value) {
  const typeofWrapper = {
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

  const isNullorUndefined = value === null || value === undefined;

  // Check the value is not null or undefined.
  const states = {
    exist: !isNullorUndefined,
    empty: isNullorUndefined || value === '',
    zero: isNullorUndefined || value === 0
  };


	const assign = values => Object.assign(states, typeofWrapper, values);

  const typeOfValue = typeof value;
  // If type is a number, check if it is NAN or a valid number type.
  if (typeOfValue === 'number') {
    const typeOfNumber = Object.is(Number(value), NaN) ? 'NaN' : typeOfValue;
    const numberWrapper = {};
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
    const valueType = new String(value);
    valueType[valueType.valueOf()] = true;
    return assign(valueType);
  }

  // Check if value is an array as type 'array'.
  if (Array.isArray(value)) {
    const arrayWrapper = {};
    arrayWrapper.array = true;
    return assign(arrayWrapper);
  }

  // Get the object wrapper and valueOf type.
  const objectTypeDefinition = ({}).toString.call(value);

  // Create the object name.
  const objectType = objectTypeDefinition
    .slice(0, objectTypeDefinition.length - 1)
    .replace(/[\[\]\s]/g, '');

  const objectWrapper = {};
  const objectParam = objectType === 'objectObject' ? 'object' : objectType;
  objectWrapper[objectParam] = true;

  // Return the object<type> value if an object is wrapped by an object.
  return assign(objectWrapper);
}

export default type;
