import {
  Campus,
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
  CED,
  LoginPayload,
  Payload,
  CounsellorAdd,
  UserRolePayload,
  UserMetrics,
  Data,
  NewsData,
  ItemUpdate,
} from "./types";
const FORM_HEADERS = { "Content-Type": "multipart/form-data" };
class Client {
  users = {
    login: (data: LoginData) =>
      HttpClient.post<LoginPayload>(API_ENDPOINTS.LOGIN, data),
    profile: () => HttpClient.get<{ user: User }>(API_ENDPOINTS.PROFILE),
    query: (email: string) =>
      HttpClient.get<{ user: User }>(API_ENDPOINTS.QUERY_USER_INFO + email),
    metrics: () => HttpClient.get<UserMetrics>(API_ENDPOINTS.METRICS),
    role: (uid: string) =>
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
    forums: () => HttpClient.get<Data<Payload<Group[]>>>(API_ENDPOINTS.FORUMS),
    deleteForum: (fid: string) =>
      HttpClient.delete<Data<Payload<Group>>>(API_ENDPOINTS.COUNSELING + fid),
    createForum: (data: FormData) =>
      HttpClient.post<Data<Payload<Group>>>(API_ENDPOINTS.FORUM, data, {
        headers: FORM_HEADERS,
      }),
  };
  admin = {
    campuses: () =>
      HttpClient.get<{
        campuses: Campus[];
      }>(API_ENDPOINTS.CAMPUSES),
    contacts: () =>
      HttpClient.get<{
        contacts: ContactInfo[];
      }>(API_ENDPOINTS.CONTACT),
    createContact: (data: ContactInfo) =>
      HttpClient.post<{ contacts: ContactInfo }>(API_ENDPOINTS.CONTACT, data),
    deleteContact: (id: string) =>
      HttpClient.delete<{ contacts: ContactInfo }>(API_ENDPOINTS.CONTACT + id),
  };
  content = {
    news: () => HttpClient.get<NewsData<News[]>>(API_ENDPOINTS.NEWS),
    createNews: (data: FormData) =>
      HttpClient.post<NewsData<News>>(API_ENDPOINTS.NEWS, data, {
        headers: FORM_HEADERS,
      }),
    deleteNews: (id: string) =>
      HttpClient.delete<NewsData<News>>(API_ENDPOINTS.NEWS + id),
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
        { headers: FORM_HEADERS }
      ),
    update: ({ data, id }: ItemUpdate<FormData>) =>
      HttpClient.put<{ content: InformationContent }>(
        API_ENDPOINTS.CONTENT + id,
        data,
        { headers: FORM_HEADERS }
      ),
    delete: (id: string | number) =>
      HttpClient.delete<{ content: InformationContent }>(
        API_ENDPOINTS.CONTENT + id
      ),
  };
}

export default new Client();
