

const typeIs = (value, option) => {
	const isNullorUndefined = value === null || value === undefined;
  
  // Check the value is not null or undefined.
	if(typeof option === 'string'){
  	  return {
    	    exist: () => !isNullorUndefined,
            empty: () => isNullorUndefined || value === '',
    	    zero: () => isNullorUndefined || value === 0
          }[option]();
        }

	const typeOfValue = typeof value;
  // If type is a number, check if it is NAN or a valid number type.
	if(typeOfValue === 'number'){
  	return Object.is(Number(value),NaN) ? String(NaN) : typeOfValue;
 	}

	// Check if the type is not an instance of Object. 
  // The constructor may still be an instance of Object e.g. String.
  if (typeOfValue !== 'object') {
    return typeOfValue;
  }

	// If value is null, for convenience return type as null.
  // Rather than objectNull.
  if (value === null) {
    return String(value);
  }

  // Check if value is an array as type 'array'.
  if (Array.isArray(value)) {
    return 'array';
  }

  // Get the object wrapper and valueOf type.
  const objectTypeDefinition = ({}).toString.call(value);
  
  // Create the object name.
  const objectType = objectTypeDefinition
  .slice(0, objectTypeDefinition.length - 1)
    .replace(/[\[\]\s]/g,'');
  
  // Return the object<type> value if an object is wrapped by an object.
  return objectType === 'objectObject' ? 'object' : objectType; 
}
