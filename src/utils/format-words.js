/**
 * Transform a text to capitalize
 *
 * @param {string} command
 * @returns {string}
 */
export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Delete all the spaces in the text
 *
 * @param {string} command
 * @returns {string}
 */
export const deleteSpace = (string) => string.replace(/^\s+/, "");
//.replace(/ /g, "")

/**
 * Convert a string to lowercase
 *
 * @param {string} command
 * @returns {string}
 */
export const convertLowerCase = (string) => string.toLowerCase();

/**
 * Extract the text from the command line
 *
 * @param {string} command
 * @returns {string}
 */
export const getTextFromCommand = (command) => {
  const indexData = command.indexOf(" ");
  const text = command.slice(indexData, command.length);
  return deleteSpace(text);
};

/**
 * Splits an array into sub-arrays of two elements each.
 * @param {Array} arr - The array to split.
 * @returns {Array} - A new array with the sub-arrays of two elements each.
 */
export const divideArray = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr.slice(i, i + 2));
  }
  return result;
};
