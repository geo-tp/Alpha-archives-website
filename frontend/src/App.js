import NavBar from "./components/NavBar";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import { HomePage } from "./pages/HomePage";
import BrowserPage from "./pages/BrowsePage";
import { Footer } from "./components/Footer";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/browse/:folder" element={<BrowserPage />} />
            <Route path="/browse/" element={<BrowserPage />} />
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/auth"} element={<AuthPage />} />
            <Route path={"/profile"} element={<ProfilePage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
