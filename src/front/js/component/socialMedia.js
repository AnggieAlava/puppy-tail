import React from "react";
import "../../styles/footer.css"

const socialMedia = [
  {
    nombre: "Twitter",
    url: "https://twitter.com/thepuppytaill",
    icono: "fab fa-twitter",
  },
  {
    nombre: "Instagram",
    url: "https://www.instagram.com/thepuppytail",
    icono: "fab fa-instagram",
  },
  {
    nombre: "TikTok",
    url: "https://www.tiktok.com/@thepuppytail",
    icono: "fab fa-tiktok",
  },
];

export const SocialMedia = () => (
  <div className="content text-center d-none d-md-block">
    <div className="icon">
      {socialMedia.map((red, index) => (
        <a
          key={index}
          href={red.url}
          className=""
          target="_blank"
          rel="noopener noreferrer"
          role="button">
          <i id="red-icon" className={red.icono}></i>
        </a>
      ))}
    </div>
  </div>
);
