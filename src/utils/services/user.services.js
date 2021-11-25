import { IP_ADDRESS } from "../constants";
import { getItemFromLocalStorage, storeToLocalstorage } from "../utils";

export const login = async (credential) => {
  const result = await fetch(IP_ADDRESS + "admin/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(credential),
  }).catch((e) => {
    return e;
  });

  const data = await result.json();
  if (result.ok) {
    if (data.payload) {
      storeToLocalstorage("AUTH_TOKEN", data.payload.token);
      return {
        message: data.payload.message,
        status: result.status,
        success: true,
      };
    }
  } else {
    return {
      message: data.message,
      status: result.status,
      success: false,
    };
  }
};

export const getAuthToken = () => {
  return getItemFromLocalStorage("AUTH_TOKEN");
};

export const getuserProfile = async () => {
  const result = await fetch(IP_ADDRESS + "admin/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
  }).catch((e) => {
    return e;
  });

  const data = await result.json();
  if (result.ok) {
    return {
      user: data.user,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

export const getuserMetrics = async () => {
  const result = await fetch(IP_ADDRESS + "admin/user/metrics", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
  }).catch((e) => {
    return e;
  });
  const data = await result.json();
  if (result.ok) {
    return {
      analytics: data.metrics.analytics,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

export const logout = () => {
  localStorage.clear();
};
