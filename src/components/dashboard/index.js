import React from "react";
import { Route, Switch } from "react-router";
import Home from "../pages/home";
import { APP_ROUTES } from "../../utils/constants";
import {
  getAuthToken,
  getuserProfile,
} from "../../utils/services/user.services";
import Content from "../pages/content";
import ContentEditor from "../pages/contentEditor";
import Logout from "../pages/logout";
import { useHistory } from "react-router";
import { getuserRoles } from "../../utils/services/role.services";

export const DashboardContext = React.createContext();

function ProtectedRoutes() {
  const history = useHistory();
  const [state, setState] = React.useState({
    user: {},
    roles: [],
  });
  if (!getAuthToken()) {
    history.push(APP_ROUTES.login);
  }

  React.useEffect(() => {
    const init = async () => {
      const profile = await getuserProfile();
      if (profile.user) {
        const res = await getuserRoles(profile.user._id);
        if (res.roles) {
          setState((state) => {
            return { ...state, user: profile.user, roles: res.roles };
          });
        }
      }
    };
    init();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        ...state,
      }}
    >
      <Switch>
        <Route exact path={APP_ROUTES.home} render={() => <Home />} />
        <Route
          path={APP_ROUTES.createContent}
          render={() => <ContentEditor />}
        />
        <Route path={APP_ROUTES.content} render={() => <Content />} />
        <Route path={APP_ROUTES.logout} render={() => <Logout />} />
      </Switch>
    </DashboardContext.Provider>
  );
}

export default ProtectedRoutes;
