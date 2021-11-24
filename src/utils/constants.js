export const APP_ROUTES = {
  home: "/",
  content: "/dashboard/content/",
  updateContent: "/dashboard/content/update",
  createContent: "/dashboard/content/create/",
  logout: "/dashboard/logout/",
  login: "/dashboard/login/",
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
    title: "Logout",
    to: APP_ROUTES.logout,
    icon: "logout",
  },
];

export const IP_ADDRESS = "http://radaegerton.ddns.net/api/v1/";
