import React from "react";
import "../../styles/footer.css";

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
  <footer className="text-center text-white">
    <div className="container">
      <section className="mb-1 py-2">
        {redesSociales.map((red, index) => (
          <a
            key={index}
            className="btn btn-outline-light btn-floating m-1"
            href={red.url}
            target="_blank"
            rel="noopener noreferrer"
            role="button">
            <i className={red.icono}></i>
          </a>
        ))}
      </section>
    </div>
  </footer>
);
