import React from "react";
import "../../styles/socialMedia.css"

const SocialMedia = () => {
  return (
    <div className="social-media container-fluid d-flex justify-content-center">
      <a
        href="https://twitter.com/thepuppytaill"
        className="social-icon twitter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-twitter"></i>
      </a>
      <a
        href="https://www.instagram.com/thepuppytail"
        className="social-icon instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-instagram"></i>
      </a>
      <a
        href="https://www.tiktok.com/@thepuppytail"
        className="social-icon tiktok"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-tiktok"></i>
      </a>
    </div>
  );
};

export default SocialMedia;
