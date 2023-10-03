import React from "react";
import "../../styles/footer.css"

const redesSociales = [
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

export const Footer = () => (
  <div className="content text-center d-none d-md-block">
    <div className="">
      {redesSociales.map((red, index) => (
        <a
          key={index}
          className="icon"
          href={red.url}
          target="_blank"
          rel="noopener noreferrer"
          role="button">
          <i className={red.icono}></i>
        </a>
      ))}
    </div>
  </div>
);
