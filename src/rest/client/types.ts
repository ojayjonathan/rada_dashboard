import { Campus, Role, UserRoles } from "../../types/types";

export type Data<T> = {
  data: T;
};

export type Payload<T> = {
  payload: T;
};
export type NewsData<T> = {
  news: T;
};
export type LoginPayload = {
  payload: Payload<{
    token: string;
    message: string;
  }>;
};

export type UserRolePayload = {
  userRole: { role: Role[] };
};
export type CounsellingEndpointData<T> = {
  counsellors: T;
};
/**
 * CounsellingEndpointData alias
 */
export type CED<T> = CounsellingEndpointData<T>;

export type CounsellorAdd = {
  user_id: string | number;
  campus_id: string | number;
  expertise: string;
};


export type UserMetrics = {
  metrics: {
    analytics: {
      totalNoMaleUsers: number;
      totalNoFemaleUsers: number;
    };
  };
};
export type ItemUpdate<T> = {
  id: string | number;
  data: T;
};
