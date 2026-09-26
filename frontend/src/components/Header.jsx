import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Info, CircleUserRound, Menu, X } from "lucide-react";

import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    function handleOutsideClick(event) {
      const clickedMenu = menuRef.current?.contains(event.target);
      const clickedButton = menuButtonRef.current?.contains(event.target);

      if (!clickedMenu && !clickedButton) {
        closeMenu();
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link to="/" className="site-logo" aria-label="AQUA+ Home" onClick={closeMenu}>
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

        <button className="site-login-button" type="button">
          <CircleUserRound aria-hidden="true" />
          <span>Log in</span>
        </button>
      </nav>

      {/* ⁡⁣⁣⁢Mobile menu button⁡ */}
      <button ref={menuButtonRef} className="mobile-menu-button" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((previous) => !previous)}>
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {/* ⁡⁣⁣⁢Mobile navigation⁡ */}
      <nav ref={menuRef} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
        <NavLink to="/explore" onClick={closeMenu}>
          Explore
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>

        <button type="button" onClick={closeMenu}>
          Log in
        </button>
      </nav>
    </header>
  );
}

export default Header;
