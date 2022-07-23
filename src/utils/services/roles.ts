import {
  ApiResponse,
  ApiResponseData,
  Campus,
  Counsellor,
  PeerCounsellor,
  Schedule,
  UserRoles,
} from "../../types/types";
import { ADMIN_URL } from "../constants";
import { getAuthToken } from "./user";

export const getuserRoles = async (
  userId: string
): Promise<ApiResponse<UserRoles[]>> => {
  const result = await fetch(`${ADMIN_URL}role/${userId}`, {
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
    const roles: [] = data!.userRole.role;
    const userRoles: UserRoles[] = roles.map((role: { name: string }) => {
      if (role.name.toLowerCase() === "admin") {
        return UserRoles.Admin;
      }
      if (role.name.toLowerCase() === "counsellor") {
        return UserRoles.Counsellor;
      }
      return UserRoles.Unkwon;
    });
    return { response: userRoles, ok: true };
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

export const getCounsellor = async (): Promise<ApiResponse<Counsellor>> => {
  const result = await fetch(`${ADMIN_URL}user/counsellor`, {
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
    return { response: data!.counsellor, ok: true };
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

export const updateSchedule = async (
  schedule: Schedule[]
): Promise<ApiResponse<Schedule[]>> => {
  const result = await fetch(`${ADMIN_URL}user/counsellor/schedule`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getAuthToken(),
    },
    body: JSON.stringify({ schedule }),
  }).catch((e) => {
    return e;
  });
  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    return {
      ok: true,
      response: data!.schedule,
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

export const getCounsellors = async (): Promise<ApiResponse<Counsellor[]>> => {
  const url = `${ADMIN_URL}user/counsellors`;
  const result: Response = await fetch(url, {
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
    const counsellors = data!.counsellor;
    return { response: counsellors, ok: true };
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

export const getPeerCounsellors = async (): Promise<
  ApiResponse<PeerCounsellor[]>
> => {
  const url = `${ADMIN_URL}user/peercounsellors/`;
  const result: Response = await fetch(url, {
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
      ok: true,
      response: data!.counsellor,
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

export const getCampuses = async (): Promise<ApiResponse<Campus[]>> => {
  const result = await fetch(`${ADMIN_URL}university/campus`, {
    method: "GET",
    headers: {
      Authorization: getAuthToken(),
    },
  }).catch((e) => {
    return e;
  });
  const data: ApiResponseData = await result.json?.();
  if (result.ok) {
    return {
      ok: true,
      response: data!.campuses,
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
