import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4">
        <div className="row">
          {/* About */}
          <div className="col-6 col-md-3 mb-3">
            <h6 className="text-uppercase fw-bold mb-3">About</h6>
            <nav className="nav flex-column">
              <Link className="nav-link p-0 text-light" to="/">
                About us
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Careers
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Contact us
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Blog
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Investors
              </Link>
            </nav>
          </div>

          {/* Discover Udemy */}
          <div className="col-6 col-md-3 mb-3">
            <h6 className="text-uppercase fw-bold mb-3">Discover CyberMy</h6>
            <nav className="nav flex-column">
              <Link className="nav-link p-0 text-light" to="/">
                Get the app
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Teach on CyberMy
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Plans and Pricing
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Affiliate
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Help and Support
              </Link>
            </nav>
          </div>

          {/* Business */}
          <div className="col-6 col-md-3 mb-3">
            <h6 className="text-uppercase fw-bold mb-3">
              CyberMy for Business
            </h6>
            <nav className="nav flex-column">
              <Link className="nav-link p-0 text-light" to="/">
                CyberMy Business
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="col-6 col-md-3 mb-3">
            <h6 className="text-uppercase fw-bold mb-3">
              Legal & Accessibility
            </h6>
            <nav className="nav flex-column">
              <Link className="nav-link p-0 text-light" to="/">
                Accessibility statement
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Privacy policy
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Sitemap
              </Link>
              <Link className="nav-link p-0 text-light" to="/">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-top border-secondary">
        <div className="container py-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <Link
                to="/"
                className="d-inline-flex align-items-center text-decoration-none"
              >
                <h1>CyberMy</h1>
              </Link>
              <span className="small">© 2025 CyberMy, Inc.</span>
            </div>

            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-link btn-sm text-decoration-none text-light p-0">
                Cookie settings
              </button>

              <button className="btn btn-outline-light btn-sm d-flex align-items-center gap-2">
                <span className="material-icons-outlined">language</span>
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
