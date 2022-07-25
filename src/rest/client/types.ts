import { Campus, UserRoles } from "../../types/types";

export type Payload<T> = {
  payload: T;
};

export type LoginPayload = {
  payload: Payload<{
    token: string;
    message: string;
  }>;
};

export type UserRolePayload = {
  userRole: { role: UserRoles[] };
};
export type CounsellingEndpointData<T> = {
  counsellor: T;
};
/**
 * CounsellingEndpointData alias
 */
export type CED<T> = CounsellingEndpointData<T>;
export type CampusEndpointData = {
  campuses: Campus[];
};

export type CounsellorAdd = {
  user_id: string | number;
  campus_id: string | number;
  expertise: string;
};

export type ContactEndpointData<T> = {
  contacts: T;
};
/**
 * ContactEndpointData alias
 */
export type CE<T> = ContactEndpointData<T>;

