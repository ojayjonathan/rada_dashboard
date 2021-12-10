import { ADMIN_URL } from "../constants";
import { getAuthToken } from "./user.services";

export const getNews = async () => {
  const result = await fetch(`${ADMIN_URL}news`, {
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
      news: data.news,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};
export const deleteNews = async (id) => {
  const result = await fetch(`${ADMIN_URL}news/${id}`, {
    method: "DELETE",
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
      news: data.news,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};
export const createNewsItem = async (id) => {
  const result = await fetch(`${ADMIN_URL}news/${id}`, {
    method: "DELETE",
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
      news: data.news,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

export const createContent = async (formData) => {
  //TODO: update create content url
  const result = await fetch(`${ADMIN_URL}news/`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: getAuthToken(),
    },
    body: formData,
  }).catch((e) => {
    return e;
  });
  const data = await result.json();
  if (result.ok) {
    return {
      news: data.news,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};
