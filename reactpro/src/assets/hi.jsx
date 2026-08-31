import React, { useEffect, useState } from "react";
import "./styles.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90",
    category: "01 — ADVENTURE",
    title: "Explore the Unknown",
    description:
      "Discover breathtaking landscapes, hidden destinations and unforgettable experiences."
  },
  {
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=90",
    category: "02 — NATURE",
    title: "Into the Wild",
    description:
      "Leave the ordinary behind and experience the beauty of nature."
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90",
    category: "03 — ESCAPE",
    title: "Paradise Awaits",
    description:
      "Find peaceful shores, crystal-clear waters and places worth remembering."
  },
  {
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=90",
    category: "04 — JOURNEY",
    title: "Beyond the Horizon",
    description:
      "Every journey begins somewhere. Make yours unforgettable."
  }
];

function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(nextSlide, 5000);

    return () => clearInterval(timer);
  }, [paused]);

  return (
    <main className="page">
      <div
        className="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Header */}
        <header className="carousel-header">
          <div className="logo">FRAME<span>.</span></div>

          <div className="header-text">
            VISUAL STORIES / 2026
          </div>
        </header>

        {/* Main Content */}
        <div className="carousel-main">

          {/* Text Section */}
          <div className="content">

            <div className="category">
              {slides[current].category}
            </div>

            <h1 key={current}>
              {slides[current].title}
            </h1>

            <p key={`p-${current}`}>
              {slides[current].description}
            </p>

            <div className="content-line"></div>

            <div className="slide-counter">
              <strong>
                {String(current + 1).padStart(2, "0")}
              </strong>

              <span>/</span>

              <span>
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="image-area">

            <div className="image-wrapper">
              {slides.map((slide, index) => (
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.title}
                  className={index === current ? "active" : ""}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="navigation">
              <button
                onClick={previousSlide}
                aria-label="Previous slide"
              >
                ←
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next slide"
              >
                →
              </button>
            </div>

          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="thumbnail-container">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={`thumbnail ${
                index === current ? "selected" : ""
              }`}
              onClick={() => setCurrent(index)}
            >
              <img src={slide.image} alt={slide.title} />
              <span>0{index + 1}</span>
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="progress">
          <div
            className="progress-fill"
            style={{
              width: `${((current + 1) / slides.length) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </main>
  );
}

export default ImageCarousel;

