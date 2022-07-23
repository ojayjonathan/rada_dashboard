import { Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./utils/constants";
import Login from "./components/pages/login";
import ProtectedRoutes from "./components/dashboard";

function App() {
  return (
    <Routes>
      <Route path={APP_ROUTES.login} element={<Login />} />
      <Route path="*"    element={<ProtectedRoutes />} />
    </Routes>
  );
}

export default App;