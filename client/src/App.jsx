import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// Public / Static Views
import HomePage from "./features/static/HomePage";
import HowItWorksPage from "./features/static/HowItWorksPage";
import ContactHelpPage from "./features/static/ContactHelpPage";
import NotFoundPage from "./features/static/NotFoundPage";

// Auth Views
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import ForgotPasswordPage from "./features/auth/ForgotPasswordPage";
import ResetPasswordPage from "./features/auth/ResetPasswordPage";
import VerifyEmailPage from "./features/auth/VerifyEmailPage";
import EmailNoticePage from "./features/auth/EmailNoticePage";

// Destination Views
import ExplorePage from "./features/destinations/ExplorePage";
import DestinationDetailPage from "./features/destinations/DestinationDetailPage";

// Trip Views
import MyJourneyPage from "./features/trips/MyJourneyPage";
import TripDetailPage from "./features/trips/TripDetailPage";
import SharedTripPage from "./features/trips/SharedTripPage";

// Travel Tools & Profile Views
import TravelToolsPage from "./features/tools/TravelToolsPage";
import ProfilePage from "./features/profile/ProfilePage";

// Prevent logged-in users from seeing login/register
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (!loading && isAuthenticated) {
    return <Navigate to="/my-journey" replace />;
  }
  return children;
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <Routes>
              {/* ── Public Routes ── */}
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route
                path="/destinations/:id"
                element={<DestinationDetailPage />}
              />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/contact" element={<ContactHelpPage />} />
              <Route path="/help" element={<ContactHelpPage />} />
              <Route path="/share/:token" element={<SharedTripPage />} />

              {/* ── Auth Routes (Public Only) ── */}
              <Route
                path="/login"
                element={
                  <PublicOnlyRoute>
                    <LoginPage />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicOnlyRoute>
                    <RegisterPage />
                  </PublicOnlyRoute>
                }
              />
              <Route path="/check-email" element={<EmailNoticePage />} />
              <Route
                path="/verify-email/:token"
                element={<VerifyEmailPage />}
              />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
              />

              {/* ── Authenticated Routes ── */}
              <Route
                path="/my-journey"
                element={
                  <ProtectedRoute>
                    <MyJourneyPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trips/:id"
                element={
                  <ProtectedRoute>
                    <TripDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tools"
                element={
                  <ProtectedRoute>
                    <TravelToolsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              {/* ── 404 Fallback ── */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
