import BackgroundParticles from "../BackgroundParticles/Particles";

function HomePage() {
  return (
    <div className="login">
      <div className="login-app">
        <BackgroundParticles />

        <link rel="stylesheet" href="HomePage.css"></link>

        <a href="/login" id="login-link">
          Login
        </a>
        <br />
        <a href="/signup" id="signup-link">
          Sign Up
        </a>
        <br />
      </div>
      <div className="home-page ">
        <p className="company-page-title">Hospital Jobs</p>
        <p className="home-page-title">
          Welcome to <span class="custom-color">Hospital Jobs</span> Site
        </p>
        <p className="home-page-title">
          Find the perfect job in the medical field,
        </p>

        <p className="home-page-title">with our comprehensive job listings.</p>
      </div>
      <footer id="footer">
        <h5 className="footHead">Contact Us</h5>
        <p className="foot">Email: vedanth.vasudev@gmail.com</p>
        <p className="foot">Phone: +447774713897</p>
      </footer>
    </div>
  );
}

export default HomePage;
