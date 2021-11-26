export const APP_ROUTES = {
  home: "/",
  content: "/dashboard/content/",
  updateContent: "/dashboard/content/update",
  createContent: "/dashboard/content/create/",
  logout: "/dashboard/logout/",
  login: "/dashboard/login/",
  counsellors: "/dashboard/counselors/",
  peerCounsellors: "/dashboard/peer-counselors/",
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
    title: "consellors",
    to: APP_ROUTES.counsellors,
    icon: "group",
  },
  {
    title: "peer counsellors",
    to: APP_ROUTES.peerCounsellors,
    icon: "group",
  },
  {
    title: "Logout",
    to: APP_ROUTES.logout,
    icon: "logout",
  },
];

export const IP_ADDRESS = "http://radaegerton.ddns.net/api/v1/";

export const USER_ROLES = {
  admin: "ADMIN",
  counsellor: "COUNSELLOR",
};

export const IMAGE_URL = "http://radaegerton.ddns.net/api/v1/uploads/";
