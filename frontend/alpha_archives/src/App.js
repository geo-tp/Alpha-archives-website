import ImageUpload from "./components/ImageUpload"
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import UploadDescription from './components/UploadDescription';
import UploadPage from './containers/UploadPage';
import HomePage from './containers/HomePage';
import BrowserPage from './containers/BrowsePage';

function App() {
  return (
    <Router>
      <NavBar/>
      <div className="App">

        <Switch>
          <Route path="/upload">
            <UploadPage/>
          </Route>

          <Route path="/browse">
            <BrowserPage/>
          </Route>

          <Route path={["/home", ""]}>
            <HomePage/>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
