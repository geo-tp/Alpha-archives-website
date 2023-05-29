import { Home } from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainHeader } from "./components/MainHeader";
import { MainFooter } from "./components/MainFooter";
import { Upload } from "./pages/upload";
import { Login } from "./pages/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "./store/slices/auth/selectors";
import { Dashboard } from "./pages/dashboard";
import { useEffect } from "react";
import { Browser } from "./pages/browse";
import { RequireAuth, restoreSavedAuth } from "./utils/auth";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    restoreSavedAuth(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <MainHeader />
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/browse/:folder" element={<Browser />} />
          <Route path="/browse/" element={<Browser />} />
          <Route path={"/"} element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          {/* <Route
            path={"/password-reset/:key"}       
            element={<PasswordResetPage />}
          /> */}
          <Route
            path={"/profile"}
            element={
              <RequireAuth auth={auth}>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
        <MainFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
