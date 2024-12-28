import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import './Footer.css'; 

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <span>© 2024 Foodie, Inc. All rights reserved.</span>
        </div>

        <div className="footer-right">
          <ul className="social-icons">
            <li>
              <a
                href="https://www.facebook.com/shakilmalek111"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaFacebook size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/shakilmalek111/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaInstagram size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/malekshakil111/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaLinkedin size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
