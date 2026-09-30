import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import ExhibitDetails from "./pages/ExhibitDetails.jsx";
import About from "./pages/About.jsx";
import MyCollection from "./pages/MyCollection.jsx";
import Experience from "./pages/Experience.jsx";

function App() {
  const location = useLocation();
  const isExperiencePage = location.pathname === "/experience";

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

  return (
    <div className="app-container">
      {!isExperiencePage && <Header />}

      <div className={`page-container ${pageClass}`}>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:slug" element={<ExhibitDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-collection" element={<MyCollection />} />
            <Route path="/experience" element={<Experience />} />
          </Routes>
        </div>

        {!isExperiencePage && <Footer />}
      </div>
    </div>
  );
}

export default App;
