export default function About() {
  return (
    <div>
      <section className="page-banner">
        <span className="eyebrow">ABOUT US</span>
        <h1>We build technology that creates impact.</h1>
        <p>
          A technology-driven company focused on building
          useful digital solutions and empowering people.
        </p>
      </section>

      <section className="section">
        <div className="split-section">
          <div>
            <span className="eyebrow">WHO WE ARE</span>

            <h2>Technology. People. Progress.</h2>

            <p>
              CompanyConnect is a modern technology company
              providing digital solutions for businesses of
              different sizes.
            </p>

            <p>
              We focus on creating reliable, scalable, and
              user-friendly applications that solve real
              business problems.
            </p>
          </div>

          <div className="highlight-card">
            <h3>Our Mission</h3>
            <p>
              To use technology to simplify business processes,
              improve productivity, and create meaningful
              digital experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="section-heading">
          <span className="eyebrow">OUR VALUES</span>
          <h2>What drives us</h2>
        </div>

        <div className="card-grid three">
          <div className="info-card">
            <h3>Innovation</h3>
            <p>
              We continuously explore better ways to solve
              problems using technology.
            </p>
          </div>

          <div className="info-card">
            <h3>Integrity</h3>
            <p>
              We believe in transparency, responsibility, and
              building long-term relationships.
            </p>
          </div>

          <div className="info-card">
            <h3>Growth</h3>
            <p>
              We encourage continuous learning and professional
              development.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}