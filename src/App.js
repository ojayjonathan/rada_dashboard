import { Switch, Route } from "react-router-dom";
import { APP_ROUTES } from "./utils/constants";
import Login from "./components/pages/login";
import ProtectedRoutes from "./components/dashboard";

function App() {
  return (
    <Switch>
      <Route path={APP_ROUTES.login} render={() => <Login />} />
      <Route path="/" render={() => <ProtectedRoutes />} />
    </Switch>
  );
}

export default App;
