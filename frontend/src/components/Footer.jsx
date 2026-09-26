import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-copyright">&copy; 2026 AQUA+. All Rights Reserved.</p>

      <nav className="footer-nav" aria-label="Footer navigation">
        <Link to="/about">About AQUA+</Link>
        <span>Privacy Policy</span>
        <span>Contact</span>
      </nav>
    </footer>
  );
}

export default Footer;
