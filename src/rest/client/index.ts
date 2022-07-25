import {
  ContactInfo,
  ContentCategory,
  Counsellor,
  Group,
  InformationContent,
  LoginData,
  News,
  PeerCounsellor,
  Schedule,
  User,
} from "../../types/types";
import API_ENDPOINTS from "./api-endpoints";
import HttpClient from "./http-client";
import {
  CampusEndpointData,
  CED,
  LoginPayload,
  Payload,
  CounsellorAdd,
  UserRolePayload,
  CE,
} from "./types";
const FORM_HEADERS = {
  headers: { "Content-Type": "multipart/form-data" },
};

class Client {
  users = {
    login: (data: LoginData) =>
      HttpClient.post<LoginPayload>(API_ENDPOINTS.LOGIN, data),
    profile: () => HttpClient.get<User>(API_ENDPOINTS.PROFILE),
    queryUser: (email: string) =>
      HttpClient.get<User>(API_ENDPOINTS.QUERY_USER_INFO + email),
    userMetrics: () => HttpClient.get<User>(API_ENDPOINTS.METRICS),
    userRole: (uid: string) =>
      HttpClient.get<UserRolePayload>(API_ENDPOINTS.ROLES + uid),
  };
  counselling = {
    cousellorMe: () =>
      HttpClient.get<CED<Counsellor>>(API_ENDPOINTS.COUNSELLOR),
    cousellors: () =>
      HttpClient.get<CED<Counsellor[]>>(API_ENDPOINTS.COUNSELLORS),
    addCousellor: (data: CounsellorAdd) =>
      HttpClient.post<CED<Counsellor>>(API_ENDPOINTS.COUNSELLOR, data),
    peerCousellors: () =>
      HttpClient.get<CED<PeerCounsellor[]>>(API_ENDPOINTS.PEER_COUNSELLORS),
    addPeerCousellor: (data: CounsellorAdd) =>
      HttpClient.post<CED<PeerCounsellor>>(API_ENDPOINTS.PEER_COUNSELLOR, data),
    updateSchedule: (schedule: Schedule[]) =>
      HttpClient.put<Schedule[]>(API_ENDPOINTS.COUNSELLORS_SCHEDULE, {
        schedule,
      }),
    forums: () => HttpClient.get<Payload<Group[]>>(API_ENDPOINTS.FORUMS),
    deleteForum: (fid: string) =>
      HttpClient.delete<Payload<Group>>(API_ENDPOINTS.COUNSELING + fid),
    createForum: (data: FormData) =>
      HttpClient.post<Payload<Group>>(API_ENDPOINTS.FORUM, data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
  };
  admin = {
    campuses: () => HttpClient.get<CampusEndpointData>(API_ENDPOINTS.CAMPUSES),
    contact: () => HttpClient.get<CE<ContactInfo>>(API_ENDPOINTS.CONTACT),
    createContact: (data: ContactInfo) =>
      HttpClient.post<CE<ContactInfo>>(API_ENDPOINTS.CONTACT, data),
    deleteContact: (id: string) =>
      HttpClient.delete<CE<ContactInfo>>(API_ENDPOINTS.CONTACT + id),
  };
  content = {
    news: () => HttpClient.get<News[]>(API_ENDPOINTS.NEWS),
    categories: () =>
      HttpClient.get<{ contentCategories: ContentCategory[] }>(
        API_ENDPOINTS.CONTENT_CATEGORY
      ),
    all: () =>
      HttpClient.get<{ content: InformationContent[] }>(API_ENDPOINTS.CONTENT),
    createCategory: (name: string) =>
      HttpClient.post<{ contentCategory: ContentCategory }>(
        API_ENDPOINTS.CONTENT_CATEGORY,
        { name }
      ),
    create: (data: FormData) =>
      HttpClient.post<{ content: InformationContent }>(
        API_ENDPOINTS.CONTENT,
        data,
        FORM_HEADERS
      ),
    update: (data: FormData) =>
      HttpClient.put<{ content: InformationContent }>(
        API_ENDPOINTS.CONTENT,
        data,
        FORM_HEADERS
      ),
    delete: (id: string | number) =>
      HttpClient.delete<unknown>(API_ENDPOINTS.CONTENT + id),
  };
}

export default new Client();
