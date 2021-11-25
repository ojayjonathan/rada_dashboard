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

export const generateChartData = (
  labels = [],
  data = [],
  backgroundColor,
  fill = false
) => {
  const change = 0.6 / data.length;
  let opacity = 0.9;
  // generate background colors for piechart
  if (!backgroundColor) {
    backgroundColor = [];
    for (let i = 0; i < data.length; ++i) {
      backgroundColor.push(`rgba(45,203,126,${opacity - change * i})`);
    }
  }

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColor,
        fill: fill,
      },
    ],
  };
};
