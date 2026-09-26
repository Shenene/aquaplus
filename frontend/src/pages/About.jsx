import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import "./About.css";

function About() {
  return (
    <main className="about-page">
      <section className="about-content" aria-labelledby="about-title">
        <div className="about-intro">
          <h1 id="about-title">About AQUA+</h1>

          <p>An immersive ocean-tech museum designed to inspire curiosity, innovation and conservation.</p>
        </div>

        {/* ------------------------------------------------------------------------------------------------------------------------------ */}

        <section className="about-cards" aria-label="About AQUA+">
          <article className="about-card">
            <img className="about-card-icon about-card-icon--mission" src="/images/icons/mission.svg" alt="" aria-hidden="true" />

            <h2>Mission</h2>

            <p>Bring marine education to life through immersive digital experiences and accessible exhibit discovery.</p>
          </article>

          <article className="about-card">
            <img className="about-card-icon about-card-icon--innovation" src="/images/icons/innovation.svg" alt="" aria-hidden="true" />

            <h2>Innovation</h2>

            <p>A futuristic museum concept combining interactive kiosk designs, large-scale digital displays and a 360° virtual museum experience.</p>
          </article>

          <article className="about-card">
            <img className="about-card-icon about-card-icon--sustainability" src="/images/icons/sustainability.svg" alt="" aria-hidden="true" />

            <h2>Sustainability</h2>

            <p>Encourage awareness of marine ecosystems and conservation through engaging, informative storytelling.</p>
          </article>
        </section>

        {/* ------------------------------------------------------------------------------------------------------------------------------ */}

        <section className="about-features" aria-label="AQUA+ experience features">
          <div className="about-feature">
            <img className="about-feature-icon about-feature-icon--head-rings" src="/images/icons/head-rings.svg" alt="" aria-hidden="true" />

            <div>
              <h3>Immersive</h3>
              <p>Step inside AQUA+</p>
            </div>
          </div>

          <div className="about-feature">
            <img className="about-feature-icon about-feature-icon--educational" src="/images/icons/educational.svg" alt="" aria-hidden="true" />

            <div>
              <h3>Educational</h3>
              <p>Learn through discovery</p>
            </div>
          </div>

          <div className="about-feature">
            <img className="about-feature-icon about-feature-icon--accessible" src="/images/icons/accessible.svg" alt="" aria-hidden="true" />

            <div>
              <h3>Accessible</h3>
              <p>For everyone, everywhere</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------------------------------------------------------------------ */}

        <section className="about-cta">
          <h2>A Brighter Ocean Future</h2>

          <p>Explore. Be inspired. Make a difference.</p>

          <Link to="/explore" className="about-cta-button">
            Start Exploring
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </section>
    </main>
  );
}

export default About;
