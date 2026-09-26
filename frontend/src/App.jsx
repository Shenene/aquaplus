import { Route, Routes } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
