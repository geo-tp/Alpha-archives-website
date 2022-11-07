import NavBar from "./components/NavBar";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import { HomePage } from "./pages/HomePage";
import BrowserPage from "./pages/BrowsePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/browse" element={<BrowserPage />} />

          <Route path={"/"} element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
