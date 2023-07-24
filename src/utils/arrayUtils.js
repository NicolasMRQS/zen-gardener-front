/* eslint-disable import/prefer-default-export */

/**
 * Insert / Updates the provided object based on id property
 * depending on whether it exists or not in the provided array
 * (TODO : Performance can be improved by creating some kind of "hash table")
 */
export const arrayUpsert = (elementArray, upToDateElement) => {
  // Check if elementArray is empty
  const isEmpty = Object.keys(elementArray).length === 0;
  if (isEmpty) {
    return [upToDateElement];
  }

  let resultArray = elementArray;

  // Check if upToDateElement id already exists in elementArray using filter
  const elementExists = resultArray
    .filter((currentElement) => currentElement.id === upToDateElement.id).length > 0;

  if (elementExists) {
    // If elementExists, then replace element in array using map
    resultArray = resultArray.map((currentElement) => {
      if (currentElement.id === upToDateElement.id) {
        return upToDateElement;
      }
      return currentElement;
    });
  }
  else {
    // If !elementExists, then add the element to the array using push
    resultArray.push(upToDateElement);
  }

  return resultArray;
};
