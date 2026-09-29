import { Link } from "react-router-dom";
import { ArrowRight, Bookmark, Eye, Pencil, X } from "lucide-react";

import "./MyCollection.css";

const previewSavedExhibits = [
  {
    slug: "green-sea-turtle",
    name: "Green Sea Turtle",
    category: "Marine Reptile",
    imageUrl: "/images/exhibits/green-sea-turtle.webp",
    summary: "Incredible to see how these gentle creatures maintain ocean health. A reminder of why conservation matters.",
    note: "One of my favorite exhibits.",
  },
  {
    slug: "mandarin-fish",
    name: "Mandarin Fish",
    category: "Reef Fish",
    imageUrl: "/images/exhibits/mandarin-fish.webp",
    summary: "Stunning colors! One of the most beautiful fish. Want to learn more about why it's unique.",
    note: "",
  },
  {
    slug: "seahorse",
    name: "Seahorse",
    category: "Marine Fish",
    imageUrl: "/images/exhibits/seahorse.webp",
    summary: "Fascinating adaptation. The way males carry the young is mind-blowing. Nature is extraordinary!",
    note: "",
  },
];

function MyCollection() {
  return (
    <main className="my-collection-page">
      <section className="my-collection-container">
        <div className="my-collection-heading-row">
          <div className="my-collection-heading">
            <h1>My Collection</h1>

            <p>Saved exhibits and personal notes</p>
          </div>

          <div className="my-collection-count">
            <Bookmark aria-hidden="true" />

            <span>
              {previewSavedExhibits.length} saved {previewSavedExhibits.length === 1 ? "exhibit" : "exhibits"}
            </span>
          </div>
        </div>

        <section className="saved-exhibits-panel" aria-label="Saved exhibits">
          {previewSavedExhibits.length === 0 ? (
            <div className="collection-empty-state">
              <h2>No saved exhibits yet</h2>

              <p>Explore the museum and save exhibits you'd like to revisit.</p>

              <Link to="/explore" className="collection-empty-action">
                <span>Start Exploring</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="saved-exhibits-list">
              {previewSavedExhibits.map((exhibit) => (
                <article className="saved-exhibit-card" key={exhibit.slug}>
                  <div className="saved-exhibit-image-area">
                    <img src={exhibit.imageUrl} alt={exhibit.name} className={`saved-exhibit-image saved-exhibit-image--${exhibit.slug}`} />
                  </div>

                  <div className="saved-exhibit-content">
                    <h2>{exhibit.name}</h2>

                    <p className="saved-exhibit-category">{exhibit.category}</p>

                    <p className="saved-exhibit-summary">{exhibit.summary}</p>

                    {exhibit.note && (
                      <div className="saved-exhibit-note">
                        <span>My note</span>
                        <p>{exhibit.note}</p>
                      </div>
                    )}
                  </div>

                  <div className="saved-exhibit-divider" aria-hidden="true" />

                  <div className="saved-exhibit-actions">
                    <Link to={`/explore/${exhibit.slug}`} className="saved-exhibit-action">
                      <Eye aria-hidden="true" />
                      <span>View exhibit</span>
                    </Link>

                    <button type="button" className="saved-exhibit-action">
                      <Pencil aria-hidden="true" />

                      <span>{exhibit.note ? "Edit Note" : "Add Note"}</span>
                    </button>

                    <button type="button" className="saved-exhibit-action">
                      <X aria-hidden="true" />
                      <span>Remove</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default MyCollection;
