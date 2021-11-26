import { getAuthToken } from "./user.services";

export const getForums = async () => {
  const result = await fetch(
    "http://radaegerton.ddns.net/rada/api/v1/counseling/forums",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: getAuthToken(),
      },
    }
  ).catch((e) => {
    return e;
  });
  const data = await result.json();
  if (result.ok) {
    return {
      forums: data.data.payload,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

export const createForums = async (formData) => {
  const result = await fetch(
    "http://radaegerton.ddns.net/rada/api/v1/counseling/forum",
    {
      method: "POST",
      headers: {
        Authorization: getAuthToken(),
      },
      body: formData,
    }
  ).catch((e) => {
    return e;
  });
  const data = await result.json();
  if (result.ok) {
    return {
      forums: data.data.payload,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};
