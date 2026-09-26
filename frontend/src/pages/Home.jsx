import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <h1 id="home-title" className="home-title">
          Art &middot; Quantum &middot; Universe &middot; AI
        </h1>

        <Link to="/explore" className="home-explore-button">
          Explore the Museum
        </Link>
      </section>
    </main>
  );
}

export default Home;
