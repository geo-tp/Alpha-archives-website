import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import { HomePage } from "./pages/HomePage";
import BrowserPage from "./pages/BrowsePage";
import { Footer } from "./components/Footer";
import { AuthPage } from "./pages/AuthPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "./store/features/auth/selectors";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import { useState } from "react";
import { CookieManager } from "./utils/CookieManager";
import { getConnectedSuccess } from "./store/features/auth/actions";
import { HeadersManager } from "./api/utils/headers";
import { fetchLogout } from "./api/fetchLogout";

function RequireAuth({ children }) {
  let auth = useSelector(getAuth);
  return auth.isConnected ? children : <Navigate to="/auth/" />;
}

function App() {
  const dispatch = useDispatch();

  useState(() => {
    const userData = CookieManager.retrieveUserData();

    if (userData?.hasOwnProperty("expired")) {
      // We send a logout request (it will delete cookie and auth)
      HeadersManager.addAuthorization(userData.token);
      dispatch(fetchLogout());
    }

    if (userData) {
      // We login user if data from cookie exists and are not expired
      dispatch(getConnectedSuccess(userData));
    }
  }, []);

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
          <Route
            path={"/password-reset/:key"}
            element={<PasswordResetPage />}
          />
          <Route
            path={"/profile"}
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
