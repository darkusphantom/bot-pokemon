export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const deleteSpace = (string) => string.replace(/^\s+/, "");
//.replace(/ /g, "")

export const convertLowerCase = (string) => string.toLowerCase();

export const getTextFromCommand = (command) => {
  const indexData = command.indexOf(" ");
  const text = command.slice(indexData, command.length);
  return deleteSpace(text);
};
