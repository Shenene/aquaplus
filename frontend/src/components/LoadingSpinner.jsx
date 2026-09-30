import { Loader } from "lucide-react";

import "./LoadingSpinner.css";

function LoadingSpinner({ className = "" }) {
  return <Loader className={`loading-spinner ${className}`} aria-hidden="true" />;
}

export default LoadingSpinner;
