import { useState } from "react";
import { Link } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import LoadingSpinner from "../components/LoadingSpinner.jsx";

import "./Experience.css";

function Experience() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="experience-page">
      <div className="experience-container">
        <Link to="/explore" className="experience-exit">
          <ArrowLeft aria-hidden="true" />
          <span>Exit Experience</span>
        </Link>

        <section className="experience-card" aria-labelledby="experience-heading">
          <div className="experience-heading">
            <img src="/images/icons/head-rings.svg" alt="" className="experience-heading-icon" aria-hidden="true" />

            <h1 id="experience-heading">360° Museum Experience</h1>
          </div>

          <div className="experience-viewer-container">
            {isLoading && (
              <div className="experience-loading" role="status">
                <LoadingSpinner className="experience-loading-spinner" />

                <span>Loading 360° exprience...</span>
              </div>
            )}
            <iframe className="experience-viewer" src="https://kuula.co/share/hr6r4?logo=1&info=1&fs=1&vr=0&zoom=1&thumbs=1" title="AQUA+ 360° Museum Experience" allow="xr-spatial-tracking; gyroscope; accelerometer" allowFullScreen onLoad={() => setIsLoading(false)} />
          </div>
        </section>

        <Link to="/explore#browse-exhibits" className="experience-browse">
          Browse Exhibits Instead
        </Link>
      </div>
    </main>
  );
}

export default Experience;
