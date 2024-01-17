/**
 * Transform a text to capitalize
 *
 * @param {string} command
 * @returns {string}
 */
const capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Delete all the spaces in the text
 *
 * @param {string} command
 * @returns {string}
 */
const deleteSpace = (string: string): string => {
    return string.replace(/^\s+/, "");
}
//.replace(/ /g, "")

/**
 * Convert a string to lowercase
 *
 * @param {string} command
 * @returns {string}
 */
const convertLowerCase = (string: string): string => {
    return string.toLowerCase()
};

/**
 * Extract the text from the command line
 *
 * @param {string} command
 * @returns {string}
 */
const getTextFromCommand = (command: string): string => {
    const indexData = command.indexOf(" ");
    const text = command.slice(indexData, command.length);
    return deleteSpace(text);
};

/**
 * Splits an array into sub-arrays of two elements each.
 * @param {Array} arr - The array to split.
 * @returns {Array} - A new array with the sub-arrays of two elements each.
 */
const divideArray = (arr: any[]): Array<any> => {
    const result = [];
    for (let i = 0; i < arr.length; i += 2) {
        result.push(arr.slice(i, i + 2));
    }
    return result;
};

export {
    capitalize,
    deleteSpace,
    convertLowerCase,
    getTextFromCommand,
    divideArray
}