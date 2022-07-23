import {
  ApiResponse,
  ApiResponseData,
  ContentCategory,
  News,
} from "../../types/types";
import { ADMIN_URL } from "../constants";
import { getAuthToken } from "./user";

export const getNews = async (): Promise<ApiResponse<News[]>> => {
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
      ok: true,
      response: data.news,
    };
  } else {
    return {
      ok: false,
      errorMessage: { message: data.message, status: result.status },
    };
  }
};
export const deleteNews = async (
  id: string | number
): Promise<ApiResponse<News>> => {
  const result: Response = await fetch(`${ADMIN_URL}news/${id}`, {
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
    return {
      ok: true,
      response: data!.news,
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
// export const createNewsItem = async (id) => {
//   const result = await fetch(`${ADMIN_URL}news/${id}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//       Authorization: getAuthToken(),
//     },
//   }).catch((e) => {
//     return e;
//   });
//   const data = await result.json();
//   if (result.ok) {
//     return {
//       news: data.news,
//     };
//   } else {
//     return { message: data.message, status: result.status };
//   }
// };

export const createContent = async (data: {}): Promise<
  ApiResponse<{
    message: string;
  }>
> => {
  const _request = new XMLHttpRequest();
  _request.open("POST", `${ADMIN_URL}content`);
  _request.responseType = "json";
  _request.setRequestHeader("Authorization", getAuthToken());
  _request.send(JSON.stringify(data));

  return new Promise((resolve, reject) => {
    _request.onload = (_) => {
      resolve({
        ok: true,
        response: {
          message: "Content created successfuly",
        },
      });
    };
    _request.onerror = () => {
      resolve({
        ok: false,
        errorMessage: {
          message: _request.response
            ? _request.response.message
            : "An error occured",
          status: _request.status,
        },
      });
    };
  });
};

export const createContentCategory = async (
  name: string
): Promise<ApiResponse<ContentCategory>> => {
  const _data = {
    name: name,
  };
  const _request = new XMLHttpRequest();
  _request.open("POST", `${ADMIN_URL}content/category`);
  _request.setRequestHeader("Authorization", getAuthToken());
  _request.setRequestHeader("Content-Type", "application/json;charset=utf-8");
  _request.responseType = "json";
  _request.send(JSON.stringify(_data));

  return new Promise((resolve, reject) => {
    _request.onload = (_) => {
      resolve({
        ok: true,
        response: _request.response.contentCategory,
      });
    };
    _request.onerror = () => {
      resolve({
        ok: false,
        errorMessage: {
          message: _request.response
            ? _request.response.message
            : "An error occured",
          status: _request.status,
        },
      });
    };
  });
};

//Create co
export const getContentCategories = async (): Promise<
  ApiResponse<ContentCategory[]>
> => {
  const result: Response = await fetch(`${ADMIN_URL}content/category`, {
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
      response: data!.contentCategories,
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
