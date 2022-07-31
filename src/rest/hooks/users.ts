import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API_ENDPOINTS from "../client/api-endpoints";
import client from "../client";
import { Data, Payload, UserMetrics, UserRolePayload } from "../client/types";
import { Group, LoginData, User } from "../../types/types";
import toast from "../../toast";
import { storeToLocalstorage } from "../../utils";
import { AUTH_TOKEN_KEY, USER_KEY } from "../../utils/constants";

export const useAnalytics = () => {
  return useQuery<UserMetrics, Error>(
    [API_ENDPOINTS.METRICS],
    client.users.metrics
  );
};
export const useUser = () => {
  return useQuery<{ user: User }, Error>(
    [API_ENDPOINTS.PROFILE],
    client.users.profile
  );
};
export const useRoles = () => {
  return useMutation<UserRolePayload, Error, string>(client.users.role);
};
export const useForums = () => {
  return useQuery<Data<Payload<Group[]>>, Error>(
    [API_ENDPOINTS.FORUMS],
    client.counselling.forums
  );
};

export const useDeleteForum = () => {
  const query = useQueryClient();
  return useMutation<Data<Payload<Group>>, Error, string>(
    client.counselling.deleteForum,
    {
      onMutate: (_) => {
        const previousData = query.getQueryData([API_ENDPOINTS.FORUMS]);
        toast.success({
          message: "Deleting the forumn, please wait... ",
        });
        return previousData;
      },
      onSuccess: (data, _variable, _context) => {
        query.setQueriesData(
          [API_ENDPOINTS.FORUMS],
          (old: Data<Payload<Group[]>> | any) => {
            if (old) {
              return {
                data: {
                  payload: old.data.payload.filter(
                    (group: Group) => group.id !== data.data.payload.id
                  ),
                },
              };
            }
          }
        );
        query.invalidateQueries([API_ENDPOINTS.FORUMS]);
        toast.success({
          message: "Forum deleted",
          options: { duration: 10000 },
        });
      },
      onError: (error, _, previousData) => {
        query.setQueryData([API_ENDPOINTS.FORUMS], (old: any) => previousData);
        toast.error({ message: error.message });
      },
    }
  );
};

export const useCreateForum = () => {
  const query = useQueryClient();
  return useMutation<Data<Payload<Group>>, Error, FormData>(
    client.counselling.createForum,
    {
      onSuccess: (data, _variable, _context) => {
        query.setQueriesData(
          [API_ENDPOINTS.FORUMS],
          (old: Data<Payload<Group[]>> | any) => {
            if (old) {
              return {
                data: {
                  payload: [...old.data.payload, data.data.payload],
                },
              };
            }
          }
        );
        toast.success({
          message: "Forum created successfuly!",
          options: { duration: 10000 },
        });
        query.invalidateQueries([API_ENDPOINTS.FORUMS]);
      },

      onError: (error) => {
        toast.error({ message: error.message });
      },
    }
  );
};
export const useQueryUserData = () => {
  return useMutation<{ user: User }, Error, string>(client.users.query, {
    onMutate: () => {
      toast.success({
        message: "Getting user profile, please wait...",
        options: { duration: 10000 },
      });
    },

    onError: (error) => {
      toast.error({ message: error.message });
    },
  });
};
export const useLogin = () => {
  return useMutation<any, Error, LoginData>(client.users.login, {
    onMutate: () => {
      toast.success({
        message: "Please wait...",
        options: { duration: 10000 },
      });
    },
    onSuccess: (data) => {
      storeToLocalstorage(AUTH_TOKEN_KEY, data.payload.token);
      storeToLocalstorage(USER_KEY, data.payload.user);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message ?? error.message;
      toast.error({ message: message });
    },
  });
};
