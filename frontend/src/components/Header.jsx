import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Info, CircleUserRound, Menu, X } from "lucide-react";

import { useAuth } from "../context/authContext.js";
import AuthModal from "./AuthModal.jsx";
import Toast from "./Toast.jsx";
import "./Header.css";

function Header() {
  const { user, logout, isAuthLoading } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [toast, setToast] = useState(null);

  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  const accountMenuRef = useRef(null);
  const accountButtonRef = useRef(null);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  function closeAccountMenu() {
    setAccountMenuOpen(false);
  }

  function openAuthModal() {
    closeMobileMenu();
    closeAccountMenu();
    setAuthModalOpen(true);
  }

  function closeAuthModal() {
    setAuthModalOpen(false);
  }

  function showLoginSuccessToast() {
    setToast({
      type: "success",
      message: "Successfully logged in.",
    });
  }

  async function handleLogout() {
    try {
      await logout();

      closeMobileMenu();
      closeAccountMenu();
    } catch (error) {
      console.error("Unable to log out:", error);
    }
  }

  useEffect(() => {
    function handleOutsideClick(event) {
      const clickedMobileMenu = mobileMenuRef.current?.contains(event.target);

      const clickedMobileButton = mobileMenuButtonRef.current?.contains(event.target);

      const clickedAccountMenu = accountMenuRef.current?.contains(event.target);

      const clickedAccountButton = accountButtonRef.current?.contains(event.target);

      if (mobileMenuOpen && !clickedMobileMenu && !clickedMobileButton) {
        closeMobileMenu();
      }

      if (accountMenuOpen && !clickedAccountMenu && !clickedAccountButton) {
        closeAccountMenu();
      }
    }

    function handleEscape(event) {
      if (event.key !== "Escape") {
        return;
      }

      if (mobileMenuOpen) {
        closeMobileMenu();
        mobileMenuButtonRef.current?.focus();
      }

      if (accountMenuOpen) {
        closeAccountMenu();
        accountButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen, accountMenuOpen]);

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
    <header className="site-header">
      <Link
        to="/"
        className="site-logo"
        aria-label="AQUA+ Home"
        onClick={() => {
          closeMobileMenu();
          closeAccountMenu();
        }}
      >
        <img src="/images/AQUA+Logo.svg" alt="AQUA+" />
      </Link>

      {/* ⁡⁣⁣⁢Desktop navigation⁡ */}
      <nav className="site-nav" aria-label="Primary navigation">
        <NavLink to="/explore" className="site-nav-link">
          <Search aria-hidden="true" />
          <span>Explore</span>
        </NavLink>

        <NavLink to="/about" className="site-nav-link">
          <Info aria-hidden="true" />
          <span>About</span>
        </NavLink>

        {isAuthLoading ? (
          <div className="site-login-button site-auth-loading" aria-hidden="true">
            <CircleUserRound aria-hidden="true" />
            <span>Log in</span>
          </div>
        ) : user ? (
          <div className="account-menu-wrapper">
            <button ref={accountButtonRef} className="site-login-button" type="button" aria-label={accountMenuOpen ? "Close account menu" : "Open account menu"} aria-expanded={accountMenuOpen} aria-controls="desktop-account-menu" onClick={() => setAccountMenuOpen((current) => !current)}>
              <CircleUserRound aria-hidden="true" />

              <span className="site-nav-label-spacer" aria-hidden="true">
                Log in
              </span>
            </button>

            <div ref={accountMenuRef} id="desktop-account-menu" className="account-menu" hidden={!accountMenuOpen}>
              <div className="account-menu-user">
                <span>Signed in as</span>
                <strong>{user.email}</strong>
              </div>

              <NavLink to="/my-collection" onClick={closeAccountMenu}>
                My Collection
              </NavLink>

              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
        ) : (
          <button className="site-login-button" type="button" onClick={openAuthModal}>
            <CircleUserRound aria-hidden="true" />
            <span>Log in</span>
          </button>
        )}
      </nav>

      {/* ⁡⁣⁣⁢Mobile menu button⁡ */}
      <button ref={mobileMenuButtonRef} className="mobile-menu-button" type="button" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" onClick={() => setMobileMenuOpen((previous) => !previous)}>
        {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {/* ⁡⁣⁣⁢Mobile navigation⁡ */}
      <nav ref={mobileMenuRef} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!mobileMenuOpen}>
        {!isAuthLoading && user && (
          <div className="mobile-nav-user">
            <span>Signed in as</span>
            <strong>{user.email}</strong>
          </div>
        )}
        <NavLink to="/explore" onClick={closeMobileMenu}>
          Explore
        </NavLink>

        <NavLink to="/about" onClick={closeMobileMenu}>
          About
        </NavLink>

        {!isAuthLoading && user ? (
          <>
            <NavLink to="/my-collection" onClick={closeMobileMenu}>
              My Collection
            </NavLink>

            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <button type="button" onClick={openAuthModal}>
            Log in
          </button>
        )}
      </nav>
      <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} onLoginSuccess={showLoginSuccessToast} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </header>
  );
}

export default Header;
