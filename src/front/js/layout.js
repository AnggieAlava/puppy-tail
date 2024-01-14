import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Signup } from "./pages/signup";
import { Profile } from "./pages/profile";
import { Landing } from "./pages/landing";
import { SignupKeeper } from "./pages/signupKeeper";
import { RecoveryPassword } from "./pages/recovery";
import { Navbar } from "./component/navbar";
import NotFound from "./pages/notFound";
import { ChangePassword } from "./pages/changePassword";
import Checkout from "./component/checkout";
import SignupPage from "./pages/signupPage";


const Layout = () => {
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") {
    return <BackendURL />;
  }

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Landing />} path="/" />
            <Route element={<Signup />} path="/signup" />
            <Route element={<Profile />} path="/profile/:type/:theid" />
            <Route element={<SignupKeeper />} path="/signup/keeper" />
            <Route element={<Login />} path="/login" />
            <Route element={<Home />} path="/home" />
            <Route element={<RecoveryPassword />} path="/recovery" />
            <Route element={<ChangePassword />} path="/changePassword" />
            <Route element={<SignupPage />} path="/signuppage" />
            <Route element={<Checkout />} path="/checkout/keeper/:theid" />
            <Route element={<NotFound />} path="/*" />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
