/**
 * @function - Checks if the JSON is valid
 * @param {string, buffer, URL} path
 * @returns {error}
 */

const isValidJSON = (json) => {
  let item = json;

  item = typeof item !== 'string' ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === 'object' && item !== null) {
    return true;
  }

  return false;
};

module.exports = {
  isValidJSON,
};
