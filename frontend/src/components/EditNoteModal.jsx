import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import "./SaveCollectionModal.css";

function EditNoteModal({ isOpen, exhibitName, initialNote, onClose, onSave, isSubmitting, error }) {
  const [note, setNote] = useState(initialNote ?? "");

  const modalRef = useRef(null);
  const textareaRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  const characterCount = [...note].length;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    previouslyFocusedElementRef.current = document.activeElement;

    textareaRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll('button:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');

        if (focusableElements.length === 0) {
          return;
        }

        const firstElement = focusableElements[0];

        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousBodyOverflow;

      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    onClose();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await onSave(note.trim());
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="collection-modal-overlay">
      <div ref={modalRef} className="collection-modal" role="dialog" aria-modal="true" aria-labelledby="edit-note-title">
        <button type="button" className="collection-modal-close" aria-label="Close" onClick={handleClose} disabled={isSubmitting}>
          <X aria-hidden="true" />
        </button>

        <h2 id="edit-note-title">Edit Your Note</h2>

        <p className="collection-modal-exhibit">{exhibitName}</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="edit-collection-note">Your note</label>

          <textarea ref={textareaRef} id="edit-collection-note" value={note} maxLength={200} rows={4} placeholder="Add your note here..." onChange={(event) => setNote(event.target.value)} />

          <p className="collection-note-count">{characterCount}/200</p>

          {error && (
            <p className="collection-modal-error" role="alert">
              {error}
            </p>
          )}

          <div className="collection-modal-form-actions">
            <button type="button" className="collection-modal-secondary" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </button>

            <button type="submit" className="collection-modal-primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNoteModal;
