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
  const _request = new XMLHttpRequest();
  _request.open("POST", `${ADMIN_URL}content`);
  _request.responseType = "json";
  _request.setRequestHeader("Authorization", getAuthToken());
  _request.send(formData);

  return new Promise((resolve, reject) => {
    _request.onload = (_) => {
      console.log(_request.response);
      resolve({
        data: _request.response.content,
      });
    };
    _request.onerror = () => {
      resolve({
        message: _request.response
          ? _request.response.message
          : "An error occured",
      });
    };
  });
};

//Create co
export const createContentCategory = async (name) => {
  const _data = {
    name: name,
  };
  const _request = new XMLHttpRequest();
  // _request.open("POST", `http://192.168.8.102:4040/api/v1/admin/content/category`);
  _request.open("POST", `${ADMIN_URL}content/category`);
  _request.setRequestHeader("Authorization", getAuthToken());
  _request.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  _request.responseType = "json";
  _request.send(JSON.stringify(_data));
  return new Promise((resolve, reject) => {
    _request.onload = (_) => {
      console.log(_request.response);
      resolve({
        data: _request.response.contentCategory,
      });
    };
    _request.onerror = () => {
      reject({
        message: _request.response
          ? _request.response.message
          : "An error occured",
      });
    };
  });
};

//Create co
export const getContentCategories = async () => {
  const result = await fetch(`${ADMIN_URL}content/category`, {
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
      data: data.contentCategories,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};
