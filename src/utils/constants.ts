import { SideBarItem } from "../types/types";

export const APP_ROUTES = {
  home: "/dashboard",
  content: "/dashboard/content/",
  updateContent: "/dashboard/content/update",
  createContent: "/dashboard/content/create/",
  logout: "/dashboard/logout/",
  login: "/dashboard/login/",
  counsellors: "/dashboard/counselors/",
  peerCounsellors: "/dashboard/peer-counselors/",
  contact: "/dashboard/contact/",
  map: "/dashboard/map",
  news: "/dashboard/news/",
  createNews: "/dashboard/news/create",
  issues: "/dashboard/issues/",
  error: "/dashboard/error/",
};

export const sidebarItems: SideBarItem[] = [
  {
    title: "Home",
    to: APP_ROUTES.home,
    icon: "home",
  },
  {
    title: "Content",
    to: APP_ROUTES.content,
    icon: "vertical_split",
  },
  {
    title: "Add Content",
    to: APP_ROUTES.createContent,
    icon: "note_add",
  },
  {
    title: "News",
    to: APP_ROUTES.news,
    icon: "vertical_split",
  },
  {
    title: "Consellors",
    to: APP_ROUTES.counsellors,
    icon: "group",
  },
  {
    title: "Peer counsellors",
    to: APP_ROUTES.peerCounsellors,
    icon: "group",
  },
  {
    title: "Contact",
    to: APP_ROUTES.contact,
    icon: "contact_page",
  },
  { title: "Location", to: APP_ROUTES.map, icon: "location_on" },
  { title: "Issues", to: APP_ROUTES.issues, icon: "info" },
  {
    title: "Logout",
    to: APP_ROUTES.logout,
    icon: "logout",
  },
];

export const USER_ROLES = {
  admin: "ADMIN",
  counsellor: "COUNSELLOR",
};

export const BASE_URL = "https://radaegerton.ddns.net/";
export const ADMIN_URL = "https://radaegerton.ddns.net/api/v1/admin/";
export const IMAGE_URL = `${BASE_URL}api/v1/uploads/`;
