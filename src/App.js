
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/home"
import ContentEditor from './components/pages/contentEditor/index'
import Content from "./components/pages/content";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/create-content/" render={() => <ContentEditor />} />
          <Route path="/content/" render={() => <Content />} />
          <Route path="/" render={() => <Home />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
