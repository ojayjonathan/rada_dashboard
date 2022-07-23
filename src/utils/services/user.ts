import {
  ApiResponse,
  ApiResponseData,
  ApplicationMessage,
  MessageType,
  User,
} from "../../types/types";
import { ADMIN_URL } from "../constants";
import { getItemFromLocalStorage, storeToLocalstorage } from "../utils";

export const login = async (credential: {
  password: string;
  email: string;
}): Promise<{ success: boolean; response: ApplicationMessage }> => {
  const result = await fetch(ADMIN_URL + "user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(credential),
  }).catch((e) => {
    return e;
  });

  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    if (data!.payload) {
      storeToLocalstorage("AUTH_TOKEN", data!.payload.token);
      return {
        success: true,
        response: {
          message: data!.payload.message,
          type: MessageType.Success,
        },
      };
    }
  }
  return {
    success: false,
    response: {
      message: data?.message ?? "An error occured",
      type: MessageType.Error,
    },
  };
};

export const getAuthToken = (): string => {
  return getItemFromLocalStorage("AUTH_TOKEN") ?? "";
};

export const getuserProfile = async (): Promise<ApiResponse<User>> => {
  const result: Response = await fetch(ADMIN_URL + "user/profile", {
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
    return {
      response: data!.user,
      ok: true,
    };
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

export const queryUser = async (email: string): Promise<ApiResponse<User>> => {
  const result = await fetch(`${ADMIN_URL}user/queryUserInfo/${email}`, {
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
    return {
      response: data!.user,
      ok: true,
    };
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

export const getuserMetrics = async () => {
  const result = await fetch(ADMIN_URL + "user/metrics", {
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
    return {
      analytics: data!.metrics.analytics,
    };
  } else {
    return {
      message: data?.message ?? "An error occured",
      status: result.status,
    };
  }
};

export const logout = () => {
  localStorage.clear();
};
