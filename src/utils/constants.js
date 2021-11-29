export const APP_ROUTES = {
  home: "/",
  content: "/dashboard/content/",
  updateContent: "/dashboard/content/update",
  createContent: "/dashboard/content/create/",
  logout: "/dashboard/logout/",
  login: "/dashboard/login/",
  counsellors: "/dashboard/counselors/",
  peerCounsellors: "/dashboard/peer-counselors/",
  contact: "/dashboard/contact/",
  map: "/dashboard/map",
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
