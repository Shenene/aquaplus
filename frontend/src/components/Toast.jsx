import { ArrowRight, CircleCheckBig, X } from "lucide-react";

import "./Toast.css";

function Toast({ message, onClose, type = "success", actionLabel, onAction }) {
  return (
    <div className={`toast toast-${type}${actionLabel && onAction ? " toast-has-action" : ""}`}>
      <CircleCheckBig className="toast-icon" aria-hidden="true" />

      <div className="toast-body">
        <p className="toast-message" role="status">
          {message}
        </p>

        {actionLabel && onAction && (
          <button type="button" className="toast-action" onClick={onAction}>
            <span>{actionLabel}</span>
            <ArrowRight aria-hidden="true" />
          </button>
        )}
      </div>

      <button type="button" className="toast-close" aria-label="Close notification" onClick={onClose}>
        <X aria-hidden="true" />
      </button>
    </div>
  );
}

export default Toast;
