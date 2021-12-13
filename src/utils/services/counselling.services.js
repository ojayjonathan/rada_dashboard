import { getAuthToken } from "./user.services";
import { ADMIN_URL, BASE_URL } from "../constants";

export const getForums = async () => {
  const result = await fetch(`${BASE_URL}rada/api/v1/counseling/forums`, {
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
      forums: data.data.payload,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

export const deleteForums = async (id) => {
  const result = await fetch(`${BASE_URL}rada/api/v1/counseling/${id}`, {
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
      forum: data.data.payload,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};
export const createForums = async (formData) => {
  const _request = new XMLHttpRequest();
  _request.open("POST", `${BASE_URL}rada/api/v1/counseling/forum`);
  _request.responseType = "json";
  _request.setRequestHeader("Authorization", getAuthToken());
  _request.send(formData);

  return new Promise((resolve, reject) => {
    _request.onload = (_) => {
      if (_request.response.data) {
        resolve({
          forum: _request.response.data.payload,
        });
      } else {
        resolve({
          message: _request.response.message,
        });
      }
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

export const addCounsellor = async (
  userId,
  campusId,
  expertise,
  peer = false
) => {
  const url = peer
    ? `${ADMIN_URL}user/peercounsellor`
    : `${ADMIN_URL}user/counsellor`;
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify({
      user_id: userId + "",
      campus_id: campusId,
      expertise: expertise,
    }),
  }).catch((e) => {
    return e;
  });
  const data = await result.json();
  if (result.ok) {
    return {
      counsellor: data.counsellor,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

export const createContact = async (data_) => {
  const result = await fetch(`${ADMIN_URL}contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify(data_),
  }).catch((e) => {
    return e;
  });
  const data = await result.json();
  if (result.ok) {
    return {
      contact: data.contacts,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};
export const getContacts = async () => {
  const result = await fetch(`${ADMIN_URL}contact`, {
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
      contact: data.contacts,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

export const deleteContacts = async (id) => {
  const result = await fetch(`${ADMIN_URL}contact/${id}`, {
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
      contact: data.contacts,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};
