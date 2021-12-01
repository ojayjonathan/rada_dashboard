export const APP_ROUTES = {
  home: "/",
  content: "/content/",
  updateContent: "/content/update",
  createContent: "/content/create/",
  logout: "/logout/",
  login: "/login/",
  counsellors: "/counselors/",
  peerCounsellors: "/peer-counselors/",
  contact: "/contact/",
  map: "/map",
  news: "/news/",
  createNews: "/news/create",
  issues: "/issues/",
};

export const sidebarItems = [
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

export const BASE_URL = "http://radaegerton.ddns.net/";
export const ADMIN_URL = "http://radaegerton.ddns.net/api/v1/admin/";
export const IMAGE_URL = `${BASE_URL}api/v1/uploads/`;
