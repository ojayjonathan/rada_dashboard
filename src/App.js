import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/home";
import ContentEditor from "./components/pages/contentEditor/index";
import Content from "./components/pages/content";
import { APP_ROUTES } from "./utils/constants";
import Login from "./components/pages/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route
            path={APP_ROUTES.createContent}
            render={() => <ContentEditor />}
          />
          <Route path={APP_ROUTES.login} render={() => <Login />} />
          <Route path={APP_ROUTES.content} render={() => <Content />} />
          <Route path={APP_ROUTES.home} render={() => <Home />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
