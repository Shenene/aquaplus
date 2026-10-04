import { CircleCheckBig, X } from "lucide-react";

import "./Toast.css";

function Toast({ message, onClose, type = "success" }) {
  return (
    <div className={`toast toast-${type}`} role="status">
      <CircleCheckBig className="toast-icon" aria-hidden="true" />

      <p>{message}</p>

      <button type="button" className="toast-close" aria-label="Close notification" onClick={onClose}>
        <X aria-hidden="true" />
      </button>
    </div>
  );
}

export default Toast;
