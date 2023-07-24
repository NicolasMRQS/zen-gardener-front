/* eslint-disable import/prefer-default-export */

/**
 * Capitalizes first character of the provided string
 * (docs: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript)
 * @param {string} sentence The string which first character will be upper cased
 * @param {string} locale Locale to determine upper case character according to user language
 * @returns string Provided string with first character upper cased
 */
export const capitalizeFirstLetter = (
  [firstChar, ...restOfString], // Destructure specified string to extract first character
  locale = navigator.language,
) => {
  if (firstChar === undefined) {
    return '';
  }
  return firstChar.toLocaleUpperCase(locale) + restOfString.join('');
};
