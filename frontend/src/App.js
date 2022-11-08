import NavBar from "./components/NavBar";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import { HomePage } from "./pages/HomePage";
import BrowserPage from "./pages/BrowsePage";
import { Footer } from "./components/Footer";
import { AuthPage } from "./pages/AuthPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/browse/:folder" element={<BrowserPage />} />
          <Route path="/browse/" element={<BrowserPage />} />
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/auth"} element={<AuthPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
