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

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <ImageUpload/>
    </div>
    </Router>
  );
}

export default App;
