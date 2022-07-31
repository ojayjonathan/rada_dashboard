import { ChartData } from "../types/types";
import { AUTH_TOKEN_KEY } from "./constants";

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

export const generateChartData = ({
  borderColor,
  labels = [],
  data = [],
  backgroundColor,
  fill = false,
}: {
  borderColor?: string;
  labels: string[];
  data: number[] | string[];
  backgroundColor?: string[] | string;
  fill?: boolean;
}): ChartData => {
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
        borderColor: borderColor,
      },
    ],
  };
};
export const getAuthToken = (): string => {
  return getItemFromLocalStorage(AUTH_TOKEN_KEY) ?? "";
};
export const logout = () => {
  localStorage.clear();
};
