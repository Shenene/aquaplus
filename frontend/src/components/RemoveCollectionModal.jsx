import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import "./SaveCollectionModal.css";

function RemoveCollectionModal({ isOpen, exhibitName, onClose, onRemove, isSubmitting, error }) {
  const modalRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    previouslyFocusedElementRef.current = document.activeElement;

    cancelButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])');

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="collection-modal-overlay">
      <div ref={modalRef} className="collection-modal" role="dialog" aria-modal="true" aria-labelledby="remove-collection-title">
        <button type="button" className="collection-modal-close" aria-label="Close" onClick={handleClose} disabled={isSubmitting}>
          <X aria-hidden="true" />
        </button>

        <h2 id="remove-collection-title">Remove Exhibit</h2>

        <p className="collection-modal-exhibit">{exhibitName}</p>

        <p className="collection-modal-message">Are you sure you want to remove this exhibit from My Collection?</p>

        {error && (
          <p className="collection-modal-error" role="alert">
            {error}
          </p>
        )}

        <div className="collection-modal-actions">
          <button ref={cancelButtonRef} type="button" className="collection-modal-secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </button>

          <button type="button" className="collection-modal-danger" onClick={onRemove} disabled={isSubmitting}>
            {isSubmitting ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveCollectionModal;
