export const getItemFromLocalStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

export const storeToLocalstorage = (key: string, value: any): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    return false;
  }
};

export const generateChartData = (
  labels: string[] = [],
  data: number[] | string[] = [],
  backgroundColor?: string[]|string,
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
