import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import "./Explore.css";

function Explore() {
  const [exhibits, setExhibits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExhibits() {
      try {
        const response = await fetch("/api/exhibits");

        if (!response.ok) {
          throw new Error("Unable to load exhibits.");
        }

        const data = await response.json();

        setExhibits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadExhibits();
  }, []);

  return (
    <main className="explore-page">
      <section className="explore-content">
        <div className="explore-intro">
          <h1>Explore Marine Life Your Way</h1>
        </div>

        <section className="explore-360" aria-labelledby="museum-experience-heading">
          <div className="explore-360-visual" aria-hidden="true">
            <img src="/images/icons/orbital-rings.svg" alt="" className="explore-rings" />

            <svg className="explore-orbits" viewBox="0 0 561 297" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0 5) rotate(-6 277 124)">
                <ellipse className="orbit-line orbit-line-1" cx="277" cy="124" rx="235" ry="48" pathLength="100" />

                <ellipse className="orbit-line orbit-line-2" cx="277" cy="124" rx="235" ry="48" pathLength="100" transform="rotate(16 277 124)" />

                <ellipse className="orbit-line orbit-line-3" cx="277" cy="124" rx="235" ry="48" pathLength="100" transform="rotate(-16 277 124)" />
              </g>
            </svg>

            <img src="/images/icons/head.svg" alt="" className="explore-head" />
          </div>

          <div className="explore-360-text">
            <h2 id="museum-experience-heading">360° Museum Experience</h2>

            <p>Explore the futuristic AQUA+ museum in 360°.</p>

            <button type="button" className="explore-360-button">
              Enter 360° Experience
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className="explore-exhibits" aria-labelledby="browse-exhibits-heading">
          <h2 id="browse-exhibits-heading">Browse Exhibits</h2>

          {isLoading && <p>Loading exhibits...</p>}

          {error && <p role="alert">{error}</p>}

          {!isLoading && !error && (
            <div className="exhibit-grid">
              {exhibits.map((exhibit) => (
                <article className="exhibit-card" key={exhibit.id}>
                  <Link to={`/explore/${exhibit.slug}`} className="exhibit-card-link">
                    <img src={exhibit.imageUrl} alt={exhibit.name} className={`exhibit-card-image exhibit-card-image--${exhibit.slug}`} />

                    <div className="exhibit-card-content">
                      <h3>{exhibit.name}</h3>
                      <p>{exhibit.category}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default Explore;
