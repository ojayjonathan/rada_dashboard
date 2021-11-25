import React from "react";
import { Redirect } from "react-router";
import { APP_ROUTES } from "../../../utils/constants";
import { logout } from "../../../utils/services/user.services";

function Logout() {
  logout();
  return <Redirect to={APP_ROUTES.login} />;
}

export default Logout;
