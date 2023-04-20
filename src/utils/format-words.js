export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const deleteSpace = (string) => string.replace(/^\s+/, "");
//.replace(/ /g, "")

export const convertLowerCase = (string) => string.toLowerCase();
