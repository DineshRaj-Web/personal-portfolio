import "./index.css";
import "./styles/themes.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AnimatedRoutes from "./components/wrappers/AnimatedRoutes";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

import { HireMeProvider } from "./context/HireMeContext";
import SmoothScrollWrapper from "./components/wrappers/SmoothScrollWrapper";

import ScrollToTop from "./components/wrappers/ScrollToTop";

// Routes where navbar and footer should be hidden
const hiddenLayoutRoutes = [
  "/login",
  "/superadmin-login",
  "/forgot-password",
  "/admin",
  "/admin/super",
  "/admin/admins",
  "/admin/trash"
];

function Layout() {
  const location = useLocation();
  const shouldHideLayout = hiddenLayoutRoutes.some(route =>
    location.pathname === route || location.pathname.startsWith(route + "/")
  );

  return (
    <>
      <ScrollToTop />
      {!shouldHideLayout && <Navbar />}
      <SmoothScrollWrapper>
        <AnimatedRoutes />
      </SmoothScrollWrapper>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <HireMeProvider>
        <Router>
          <AuthProvider>
            <Layout />
          </AuthProvider>
        </Router>
      </HireMeProvider>
    </ToastProvider>
  );
}

export default App;
