import logo from './logo.svg';
import './App.css';
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

function App() {
  return (
    <Router>
    <div className="App">

      <Switch>
        <Route path="/upload">
          <UploadPage/>
        </Route>

        <Route path={["/home", ""]}>
          <HomePage/>
        </Route>
      </Switch>

      <NavBar/>
    </div>
    </Router>
  );
}

export default App;
