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
import Layout from "../layout";
import Counsellors from "../pages/counselors";
import PeerCounsellors from "../pages/peerCounsellors";
import { getForums } from "../../utils/services/counselling.services";
import SnackBar from "../snackar";
import PageNotFound from "../pages/error/404";
import Contact from "../pages/contact";
import MapComponent from "../pages/maps";

export const DashboardContext = React.createContext();

function ProtectedRoutes() {
  const history = useHistory();
  const [state, setState] = React.useState({
    user: {},
    roles: [],
    forums: [],
    isLoading: true,
  });
  if (!getAuthToken()) {
    history.push(APP_ROUTES.login);
  }

  React.useEffect(() => {
    const init = async () => {
      let forums = [];
      const profile = await getuserProfile();
      const forumsRes = await getForums();
      if (forumsRes.forums) {
        forums = forumsRes.forums;
      }
      if (profile.user) {
        const res = await getuserRoles(profile.user._id);
        if (res.roles) {
          setState((state) => {
            return {
              ...state,
              user: profile.user,
              roles: res.roles,
              forums,
              isLoading: false,
            };
          });
        }
      }
    };
    init();
  }, []);

  const [snackbar, setSnackbar] = React.useState({});
  const showSnackBar = (message, className, duration = 5000) => {
    setSnackbar({
      message: message,
      className: className,
      duration: duration,
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        ...state,
        showSnackBar,
      }}
    >
      <Layout>
        <SnackBar snackbar={snackbar} />
        <Switch>
          <Route exact path={APP_ROUTES.home} render={() => <Home />} />
          <Route
            exact
            path={APP_ROUTES.createContent}
            render={() => <ContentEditor />}
          />
          <Route exact path={APP_ROUTES.content} render={() => <Content />} />
          <Route exact path={APP_ROUTES.logout} render={() => <Logout />} />
          <Route
            exact
            path={APP_ROUTES.counsellors}
            render={() => <Counsellors />}
          />
          <Route
            exact
            path={APP_ROUTES.peerCounsellors}
            render={() => <PeerCounsellors />}
          />
          <Route exact path={APP_ROUTES.contact} render={() => <Contact />} />
          <Route path={APP_ROUTES.map} render={() => <MapComponent />} />
          <Route path="/*" render={() => <PageNotFound />} />
        </Switch>
      </Layout>
    </DashboardContext.Provider>
  );
}

export default ProtectedRoutes;
