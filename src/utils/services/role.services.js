import { IP_ADDRESS } from "../constants";
import { getAuthToken } from "./user.services";

export const getuserRoles = async (userId) => {
  const result = await fetch(`${IP_ADDRESS}admin/role/${userId}`, {
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
    const roles = data.userRole.role;
    const rolesArray = roles.map((role) => role.name);
    return {
      roles: rolesArray,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

export const getCounsellor = async (userId) => {
  const result = await fetch(`${IP_ADDRESS}admin/user/counsellor/${userId}`, {
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
      counsellor: data.counsellor,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};
export const updateSchedule = async (schedule = []) => {
  const result = await fetch(`${IP_ADDRESS}admin/user/counsellor/schedule`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify({ schedule }),
  }).catch((e) => {
    return e;
  });
  const data = await result.json();
  if (result.ok) {
    return {
      schedule: data.schedule,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

export const getCounsellors = async (peer = false) => {
  const url = `${IP_ADDRESS}admin/user/${
    peer ? "peercounsellors/" : "counsellors"
  }`;
  const result = await fetch(url, {
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
      counsellors: data.counsellors,
    };
  } else {
    return { message: data.message, status: result.status };
  }
};

// counseling/forums
