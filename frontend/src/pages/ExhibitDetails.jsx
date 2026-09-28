import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Bookmark } from "lucide-react";

import "./ExhibitDetails.css";

function ExhibitDetails() {
  const { slug } = useParams();

  const [exhibit, setExhibit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadExhibit() {
      try {
        const response = await fetch("/api/exhibits");

        if (!response.ok) {
          throw new Error("Unable to load exhibit.");
        }

        const data = await response.json();

        const selectedExhibit = data.find((item) => item.slug === slug);

        if (!selectedExhibit) {
          throw new Error("Exhibit not found.");
        }

        setExhibit(selectedExhibit);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadExhibit();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="exhibit-details-page">
        <p className="exhibit-details-message">Loading exhibit...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="exhibit-details-page">
        <p className="exhibit-details-message" role="alert">
          {error}
        </p>

        <Link to="/explore" className="exhibit-back-link">
          <ArrowLeft aria-hidden="true" />
          Back to Explore
        </Link>
      </main>
    );
  }

  return (
    <main className="exhibit-details-page">
      <Link to="/explore" className="exhibit-back-link">
        <ArrowLeft aria-hidden="true" />
        Back to Explore
      </Link>

      <section className="exhibit-details-layout">
        <div className="exhibit-details-image-area">
          <picture className="exhibit-details-picture">
            {exhibit.slug === "green-sea-turtle" && <source media="(max-width: 767px)" srcSet="/images/exhibits/green-sea-turtle-mobile.webp" />}

            <img src={exhibit.imageUrl} alt={exhibit.name} className={`exhibit-details-image exhibit-details-image--${exhibit.slug}`} />
          </picture>
        </div>

        <article className="exhibit-details-card">
          <div className="exhibit-details-intro">
            <h1>{exhibit.name}</h1>

            <p className="exhibit-details-category">{exhibit.category}</p>

            <p className="exhibit-details-description">{exhibit.description}</p>
          </div>

          <div className="exhibit-details-divider" />

          <div className="exhibit-facts-grid">
            <div className="exhibit-fact-card">
              <img src="/images/icons/habitat.svg" alt="" className="exhibit-fact-icon exhibit-fact-icon--habitat" aria-hidden="true" />

              <div>
                <h2>Habitat</h2>
                <p>{exhibit.habitat}</p>
              </div>
            </div>

            <div className="exhibit-fact-card">
              <img src="/images/icons/diet.svg" alt="" className="exhibit-fact-icon exhibit-fact-icon--diet" aria-hidden="true" />

              <div>
                <h2>Diet</h2>
                <p>{exhibit.diet}</p>
              </div>
            </div>

            <div className="exhibit-fact-card">
              <img src="/images/icons/lifespan.svg" alt="" className="exhibit-fact-icon exhibit-fact-icon--lifespan" aria-hidden="true" />

              <div>
                <h2>Lifespan</h2>
                <p>{exhibit.lifespan}</p>
              </div>
            </div>

            <div className="exhibit-fact-card">
              <img src="/images/icons/sustainability.svg" alt="" className="exhibit-fact-icon exhibit-fact-icon--sustainability" aria-hidden="true" />

              <div>
                <h2>Conservation Status</h2>
                <p>{exhibit.conservationStatus}</p>
              </div>
            </div>
          </div>

          <button type="button" className="exhibit-save-button">
            <Bookmark aria-hidden="true" />
            Save to My Collection
          </button>

          <p className="exhibit-save-note">You can add an optional note after saving.</p>

          <div className="exhibit-details-divider" />

          <div className="exhibit-browse-area">
            <Link to="/explore" className="exhibit-browse-link">
              Browse More Exhibits
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default ExhibitDetails;
