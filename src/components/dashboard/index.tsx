import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "../pages/home";
import { APP_ROUTES } from "../../utils/constants";
import { getAuthToken, getuserProfile } from "../../utils/services/user";
import Content from "../pages/content";
import ContentEditor from "../pages/contentEditor/main";
import Logout from "../pages/logout";
import { getuserRoles } from "../../utils/services/roles";
import Layout from "../layout";
import Counsellors from "../pages/counselors";
import PeerCounsellors from "../pages/peerCounsellors";
import { getForums } from "../../utils/services/counselling";
import { SnackBar } from "../snackar";
import PageNotFound from "../pages/error/404";
import Contact from "../pages/contact";
// import MapComponent from "../pages/maps";
import News from "../pages/news";
import CreateNews from "../pages/news/create";
import { Group, User, UserRoles } from "../../types/types";
import SnackBarComponent from "../snackar";
import ErrorPage, { ErrorProps } from "../pages/error/error";

type State = {
  user: Partial<User>;
  roles: UserRoles[];
  forums: Group[];
  isLoading: boolean;
};

export type AppState = State & {
  setForums: (forumns: Group[]) => void;
  showSnackBar: (props: SnackBar) => void;
  onPageLoadError: (props: ErrorProps) => void;
};

export const DashboardContext = React.createContext<Partial<AppState>>({});

function ProtectedRoutes() {
  const history = useNavigate();
  const [state, setState] = React.useState<State>({
    user: {},
    roles: [],
    forums: [],
    isLoading: true,
  });
  React.useEffect(() => {
    if (!getAuthToken()) {
      history(APP_ROUTES.login);
    }
  });

  const init = async () => {
    let forums: Group[] = [];
    const profile = await getuserProfile();
    const forumsRes = await getForums();
    if (forumsRes.ok) {
      forums = forumsRes.response as Group[];
    }
    if (profile.ok) {
      const user: User = profile.response;
      const res = await getuserRoles(user._id);
      if (res.ok) {
        setState((state) => {
          return {
            ...state,
            user: user,
            roles: res.response,
            forums,
            isLoading: false,
          };
        });
      }
    }
  };
  React.useEffect(() => {
    init();
  });

  const [snackbar, setSnackbar] = React.useState<SnackBar | {}>({});
  const showSnackBar = ({ message, className, duration = 5000 }: SnackBar) => {
    setSnackbar({
      message: message,
      className: className,
      duration: duration,
    });
  };
  const setForums = (forums: Group[]) => {
    setState({ ...state, forums: forums });
  };
  const navigate = useNavigate();
  const location = useLocation();
  const errorRedirect = ({ message, status = "ERROR", title }: ErrorProps) => {
    navigate(APP_ROUTES.error, {
      state: {
        message: message,
        status: status,
        nextUrl: location.pathname,
        title: title,
      },
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        setForums: setForums,
        showSnackBar: showSnackBar,
        forums: state.forums,
        isLoading: state.isLoading,
        roles: state.roles,
        user: state.user,
        onPageLoadError: errorRedirect,
      }}
    >
      <Layout>
        <SnackBarComponent {...snackbar} />
        <Routes>
          <Route path={APP_ROUTES.home} element={<Home />} />
          <Route path={APP_ROUTES.createContent} element={<ContentEditor />} />
          <Route path={APP_ROUTES.content} element={<Content />} />
          <Route path={APP_ROUTES.logout} element={<Logout />} />
          <Route path={APP_ROUTES.counsellors} element={<Counsellors />} />
          <Route
            path={APP_ROUTES.peerCounsellors}
            element={<PeerCounsellors />}
          />
          <Route path={APP_ROUTES.contact} element={<Contact />} />
          <Route path={APP_ROUTES.news} element={<News />} />
          <Route path={APP_ROUTES.createNews} element={<CreateNews />} />
          <Route path={APP_ROUTES.error} element={<ErrorPage />} />

          {/* <Route path={APP_ROUTES.map} element={ <MapComponent />} /> */}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </DashboardContext.Provider>
  );
}

export default ProtectedRoutes;
