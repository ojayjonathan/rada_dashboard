import React from "react";
import { Navigate } from "react-router-dom";
import { APP_ROUTES } from "../../../utils/constants";
import { logout } from "../../../utils/index";

function Logout() {
  logout();
  return <Navigate to={APP_ROUTES.login} />;
}

export default Logout;
