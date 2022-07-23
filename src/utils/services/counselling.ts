import { getAuthToken } from "./user";
import { ADMIN_URL, BASE_URL } from "../constants";
import {
  ApiResponse,
  ApiResponseData,
  ContactInfo,
  Counsellor,
  Group,
  PeerCounsellor,
} from "../../types/types";

export const getForums = async (): Promise<ApiResponse<Group[]>> => {
  const result: Response = await fetch(
    `${BASE_URL}rada/api/v1/counseling/forums`,
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
  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    return { ok: true, response: data!.data.payload };
  } else {
    return {
      ok: false,
      errorMessage: {
        message: data?.message ?? "An error occured",
        status: result.status,
      },
    };
  }
};

export const deleteForums = async (id: string): Promise<ApiResponse<Group>> => {
  const result: Response = await fetch(
    `${BASE_URL}rada/api/v1/counseling/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: getAuthToken(),
      },
    }
  ).catch((e) => {
    return e;
  });
  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    return { ok: true, response: data!.data.payload };
  } else {
    return {
      ok: false,
      errorMessage: {
        message: data?.message ?? "An error occured",
        status: result.status,
      },
    };
  }
};
export const createForums = async (
  formData: FormData
): Promise<ApiResponse<Group>> => {
  const _request = new XMLHttpRequest();
  _request.open("POST", `${BASE_URL}rada/api/v1/counseling/forum`);
  _request.responseType = "json";
  _request.setRequestHeader("Authorization", getAuthToken());
  _request.send(formData);

  return new Promise((resolve, reject) => {
    _request.onload = (_) => {
      if (_request.response.data) {
        resolve({ ok: true, response: _request.response.data.payload });
      } else {
        resolve({
          ok: false,
          errorMessage: {
            message: _request.response.message ?? "An error occured",
            status: _request.status,
          },
        });
      }
    };
    _request.onerror = () => {
      resolve({
        ok: false,
        errorMessage: {
          message: _request.response.message ?? "An error occured",
          status: _request.status,
        },
      });
    };
  });
};

export const addPeerCounsellor = async (
  userId: string,
  campusId: string,
  expertise: string
): Promise<ApiResponse<PeerCounsellor>> => {
  const result: Response = await fetch(`${ADMIN_URL}user/peercounsellor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify({
      user_id: userId,
      campus_id: campusId,
      expertise: expertise,
    }),
  }).catch((e) => {
    return e;
  });
  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    return { ok: true, response: data!.counsellor };
  } else {
    return {
      ok: false,
      errorMessage: {
        message: data?.message ?? "An error occured",
        status: result.status,
      },
    };
  }
};

export const addCounsellor = async (
  userId: string,
  campusId: string,
  expertise: string
): Promise<ApiResponse<Counsellor>> => {
  const result: Response = await fetch(`${ADMIN_URL}user/counsellor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify({
      user_id: userId,
      campus_id: campusId,
      expertise: expertise,
    }),
  }).catch((e) => {
    return e;
  });
  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    return { ok: true, response: data!.counsellor };
  } else {
    return {
      ok: false,
      errorMessage: {
        message: data?.message ?? "An error occured",
        status: result.status,
      },
    };
  }
};

export const createContact = async (
  data_: ContactInfo
): Promise<ApiResponse<ContactInfo>> => {
  const result: Response = await fetch(`${ADMIN_URL}contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify(data_),
  }).catch((e) => {
    return e;
  });
  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    return { response: data!.contacts, ok: true };
  } else {
    return {
      ok: false,
      errorMessage: {
        message: data?.message ?? "An error occured",
        status: result.status,
      },
    };
  }
};
export const getContacts = async (): Promise<ApiResponse<ContactInfo[]>> => {
  const result: Response = await fetch(`${ADMIN_URL}contact`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
  }).catch((e) => {
    return e;
  });
  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    return { response: data!.contacts, ok: true };
  } else {
    return {
      ok: false,
      errorMessage: {
        message: data!.message ?? "An error occured",
        status: result.status,
      },
    };
  }
};

export const deleteContacts = async (
  id: number | string
): Promise<ApiResponse<ContactInfo>> => {
  const result: Response = await fetch(`${ADMIN_URL}contact/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
  }).catch((e) => {
    return e;
  });
  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    return { response: data!.contacts, ok: true };
  } else {
    return {
      ok: false,
      errorMessage: {
        message: data?.message ?? "An error occured",
        status: result.status,
      },
    };
  }
};
