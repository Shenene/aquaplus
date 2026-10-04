import { useEffect, useRef, useState } from "react";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AuthModal from "./components/AuthModal.jsx";
import Toast from "./components/Toast.jsx";

import { useAuth } from "./context/authContext.js";

import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import ExhibitDetails from "./pages/ExhibitDetails.jsx";
import About from "./pages/About.jsx";
import MyCollection from "./pages/MyCollection.jsx";
import Experience from "./pages/Experience.jsx";

function ProtectedRoute({ children }) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const location = useLocation();
  const isExperiencePage = location.pathname === "/experience";

  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [toast, setToast] = useState(null);

  const pendingLoginActionRef = useRef(null);

  let pageClass = "";

  if (location.pathname === "/") {
    pageClass = "page-home";
  } else if (location.pathname === "/about") {
    pageClass = "page-about";
  } else if (location.pathname === "/my-collection") {
    pageClass = "page-collection";
  } else if (location.pathname.startsWith("/explore/")) {
    pageClass = "page-exhibit";
  } else if (location.pathname.startsWith("/explore")) {
    pageClass = "page-explore";
  }

  function openAuthModal(afterLogin) {
    pendingLoginActionRef.current = typeof afterLogin === "function" ? afterLogin : null;

    setAuthModalOpen(true);
  }

  function closeAuthModal() {
    setAuthModalOpen(false);
    pendingLoginActionRef.current = null;
  }

  function handleLoginSuccess() {
    setToast({
      type: "success",
      message: "Successfully logged in.",
    });
    const pendingAction = pendingLoginActionRef.current;

    pendingLoginActionRef.current = null;

    pendingAction?.();
  }

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [toast]);

  return (
    <div className="app-container">
      {!isExperiencePage && <Header onLoginRequest={openAuthModal} />}

      <div className={`page-container ${pageClass}`}>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:slug" element={<ExhibitDetails onLoginRequest={openAuthModal} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/my-collection"
              element={
                <ProtectedRoute>
                  <MyCollection />
                </ProtectedRoute>
              }
            />
            <Route path="/experience" element={<Experience />} />
          </Routes>
        </div>

        {!isExperiencePage && <Footer />}
      </div>
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} onLoginSuccess={handleLoginSuccess} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;
