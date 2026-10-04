import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bookmark, Eye, Pencil, X } from "lucide-react";

import EditNoteModal from "../components/EditNoteModal.jsx";
import RemoveCollectionModal from "../components/RemoveCollectionModal.jsx";
import Toast from "../components/Toast.jsx";

import "./MyCollection.css";

function MyCollection() {
  const [savedExhibits, setSavedExhibits] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedExhibit, setSelectedExhibit] = useState(null);

  const [isUpdatingNote, setIsUpdatingNote] = useState(false);

  const [noteError, setNoteError] = useState("");

  const [exhibitToRemove, setExhibitToRemove] = useState(null);

  const [isRemoving, setIsRemoving] = useState(false);

  const [removeError, setRemoveError] = useState("");

  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadCollection() {
      try {
        setError("");

        const response = await fetch("/api/collection");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load your collection");
        }

        const collection = data.collection.map((savedItem) => ({
          savedId: savedItem.id,
          exhibitId: savedItem.exhibitId,
          note: savedItem.note,

          ...savedItem.exhibit,
        }));

        setSavedExhibits(collection);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadCollection();
  }, []);

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

  function openEditModal(exhibit) {
    setNoteError("");
    setSelectedExhibit(exhibit);
  }

  function closeEditModal() {
    setNoteError("");
    setSelectedExhibit(null);
  }

  async function handleUpdateNote(note) {
    if (!selectedExhibit) {
      return;
    }

    setNoteError("");
    setIsUpdatingNote(true);

    try {
      const response = await fetch(`/api/collection/${selectedExhibit.exhibitId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update your note.");
      }

      setSavedExhibits((current) =>
        current.map((exhibit) =>
          exhibit.savedId === selectedExhibit.savedId
            ? {
                ...exhibit,
                note: data.savedExhibit.note,
              }
            : exhibit,
        ),
      );

      setSelectedExhibit(null);

      setToast({
        type: "success",
        message: "Your note has been updated.",
      });
    } catch (err) {
      setNoteError(err.message);
    } finally {
      setIsUpdatingNote(false);
    }
  }

  function openRemoveModal(exhibit) {
    setRemoveError("");
    setExhibitToRemove(exhibit);
  }

  function closeRemoveModal() {
    setRemoveError("");
    setExhibitToRemove(null);
  }

  async function handleRemoveExhibit() {
    if (!exhibitToRemove) {
      return;
    }

    setRemoveError("");
    setIsRemoving(true);

    try {
      const response = await fetch(`/api/collection/${exhibitToRemove.exhibitId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to remove this exhibit.");
      }

      setSavedExhibits((current) => current.filter((exhibit) => exhibit.savedId !== exhibitToRemove.savedId));

      setExhibitToRemove(null);

      setToast({
        type: "success",
        message: "Removed from My Collection.",
      });
    } catch (err) {
      setRemoveError(err.message);
    } finally {
      setIsRemoving(false);
    }
  }

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
              {savedExhibits.length} saved {savedExhibits.length === 1 ? "exhibit" : "exhibits"}
            </span>
          </div>
        </div>

        <section className="saved-exhibits-panel" aria-label="Saved exhibits">
          {isLoading ? (
            <div className="collection-empty-state">
              <h2>Loading your collection...</h2>
            </div>
          ) : error ? (
            <div className="collection-empty-state" role="alert">
              <h2>Unable to load your collection</h2>

              <p>{error}</p>
            </div>
          ) : savedExhibits.length === 0 ? (
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
              {savedExhibits.map((exhibit) => (
                <article className="saved-exhibit-card" key={exhibit.savedId}>
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

                    <button type="button" className="saved-exhibit-action" onClick={() => openEditModal(exhibit)}>
                      <Pencil aria-hidden="true" />

                      <span>{exhibit.note ? "Edit Note" : "Add Note"}</span>
                    </button>

                    <button type="button" className="saved-exhibit-action" onClick={() => openRemoveModal(exhibit)}>
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

      <EditNoteModal key={selectedExhibit?.savedId ?? "closed"} isOpen={Boolean(selectedExhibit)} exhibitName={selectedExhibit?.name ?? ""} initialNote={selectedExhibit?.note ?? ""} onClose={closeEditModal} onSave={handleUpdateNote} isSubmitting={isUpdatingNote} error={noteError} />

      <RemoveCollectionModal isOpen={Boolean(exhibitToRemove)} exhibitName={exhibitToRemove?.name ?? ""} onClose={closeRemoveModal} onRemove={handleRemoveExhibit} isSubmitting={isRemoving} error={removeError} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </main>
  );
}

export default MyCollection;
