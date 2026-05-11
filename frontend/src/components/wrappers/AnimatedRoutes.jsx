import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../home/Home";
import About from "../about/About";
import Work from "../work/Work";
import Skills from "../skills/Skills";
import Login from "../../pages/Login";
import SuperAdminLogin from "../../pages/SuperAdminLogin";
import ForgotPassword from "../../pages/ForgotPassword";
import AdminManagement from "../../pages/AdminManagement";
import SuperAdminDashboard from "../../pages/SuperAdminDashboard";
import NotFound from "../../pages/NotFound";
import ProtectedRoute from "../ProtectedRoute";
import PageWrapper from "./PageWrapper"; // Updated import since they are in the same folder now
import Contact from "../contact/Contact";
import AdminDashboard from "../../pages/AdminDashboard";
import TrashPage from "../../pages/TrashPage";

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageWrapper>
                            <Home />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/about"
                    element={
                        <PageWrapper>
                            <About />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/work"
                    element={
                        <PageWrapper>
                            <Work />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/skills"
                    element={
                        <PageWrapper>
                            <Skills />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <PageWrapper>
                            <Contact />
                        </PageWrapper>
                    }
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/superadmin-login"
                    element={<SuperAdminLogin />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/super"
                    element={
                        <ProtectedRoute>
                            <SuperAdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/admins"
                    element={
                        <ProtectedRoute>
                            <AdminManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/trash"
                    element={
                        <ProtectedRoute>
                            <TrashPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}
