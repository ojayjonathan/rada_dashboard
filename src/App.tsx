import { Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./utils/constants";
import Login from "./components/pages/login";
import Dashboard from "./components/dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={APP_ROUTES.login} element={<Login />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
