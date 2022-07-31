import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "../pages/home";
import { APP_ROUTES } from "../../utils/constants";
import { getAuthToken } from "../../utils/index";
import Content from "../pages/content";
import ContentEditor from "../pages/contentEditor/main";
import Logout from "../pages/logout";
import Layout from "../layout";
import Counsellors from "../pages/counselors";
import PeerCounsellors from "../pages/peerCounsellors";
import PageNotFound from "../pages/error/404";
import Contact from "../pages/contact";
import News from "../pages/news";
import CreateNews from "../pages/news/create";
import { Role, User } from "../../types/types";
import ErrorPage, { ErrorProps } from "../pages/error/error";
import CreateForum from "../forums/createForumn";
import { useRoles, useUser } from "../../rest/hooks/users";

type State = {
  user: Partial<User>;
  roles: Role[];
};

export type AppState = State & {
  onPageLoadError: (props: ErrorProps) => void;
};

export const DashboardContext = React.createContext<Partial<AppState>>({});

function Dashboard() {
  const history = useNavigate();
  React.useEffect(() => {
    if (!getAuthToken()) {
      history(APP_ROUTES.login);
    }
  });
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
  const { data: roles, mutate: getUserRoles } = useRoles();
  const { data: user } = useUser();
  React.useEffect(() => {
    user && getUserRoles(user.user._id);
  }, [user, getUserRoles]);
  return (
    <DashboardContext.Provider
      value={{
        roles: roles?.userRole.role ?? [],
        user: user?.user ?? {},
        onPageLoadError: errorRedirect,
      }}
    >
      <Layout>
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
          <Route path={APP_ROUTES.forumCreate} element={<CreateForum />} />

          <Route path={APP_ROUTES.error} element={<ErrorPage />} />

          {/* <Route path={APP_ROUTES.map} element={ <MapComponent />} /> */}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </DashboardContext.Provider>
  );
}

export default Dashboard;
