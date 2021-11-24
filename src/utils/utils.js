/**
 * retrive an item from local storage
 * @param {string} key - item to retrive from local storage
 * @example
 * getItemFromLocalStorage(ID)
 */
export const getItemFromLocalStorage = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return "";
  }
};

/**
 * store item to localstorage
 * @param {string} key  - key value for item
 * @param {any} value - value to store

 */
export const storeToLocalstorage = (key, value) => {
  try {
    return localStorage.setItem(key, value);
  } catch (e) {
    return "";
  }
};
