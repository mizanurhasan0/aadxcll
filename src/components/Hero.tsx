"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const sliderSettings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  dotsClass: "slick-dots custom-dots",
};

const Hero = () => {
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center pt-20 bg-black overflow-hidden">
      {particlesReady && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-0"
          options={{
            fullScreen: { enable: false, zIndex: 0 },
            background: { color: "#212529" },
            particles: {
              number: { value: 80, density: { enable: true } },
              color: { value: "#ffffff" },
              links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
              move: { enable: true, speed: 6, outModes: { default: "out" } },
              opacity: { value: 0.5 },
              size: { value: { min: 1, max: 3 } },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
                resize: { enable: true },
              },
              modes: {
                repulse: { distance: 200, duration: 0.4 },
                push: { quantity: 4 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
      <div className="relative z-10 mx-auto px-8 w-full h-full">
        <Slider className="w-full h-full" {...sliderSettings}>
          {/* Slide 1: Best & Reliable */}
          <div className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center justify-items-center h-full text-center">
              <div className="w-full max-w-2xl mx-auto">
                <h1 className="text-5xl font-extrabold text-white mb-2">Best &amp; Reliable</h1>
                <h2 className="text-5xl font-extrabold text-transparent mb-4" style={{ WebkitTextStroke: "2px #fff" }}>
                  CREATIVE IT.
                </h2>
                <p className="text-gray-300 mb-8">
                  Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor. ol Duis a orci nunc. Suspendisse ac convallis sapien, quis commodo libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="bg-white text-black font-bold px-8 py-3 rounded shadow hover:bg-gray-200 border-2 border-white">
                    Contact us
                  </button>
                  <button className="bg-transparent text-white font-bold px-8 py-3 rounded border-2 border-white hover:bg-white hover:text-black">
                    Projects
                  </button>
                </div>
              </div>
              <div className="flex justify-center w-full">
                <img src="https://via.placeholder.com/500x400" alt="Team" className="rounded-lg shadow-lg max-w-full" />
              </div>
            </div>
          </div>

          {/* Slide 2: Creative & Minimal */}
          <div className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center justify-items-center h-full text-center">
              <div className="w-full max-w-2xl mx-auto">
                <h1 className="text-5xl font-extrabold text-white mb-2">Creative &amp; Minimal</h1>
                <h2 className="text-5xl font-extrabold text-transparent mb-4" style={{ WebkitTextStroke: "2px #fff" }}>
                  IT AGENCY.
                </h2>
                <p className="text-gray-300 mb-8">
                  Curabitur sed facilisis erat. Vestibulum pharetra eros eget fringilla porttitor. ol Duis a orci nunc. Suspendisse ac convallis sapien, quis commodo libero. Donec nec dui luctus, pellentesque lacus sed, mollis leo.
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="bg-white text-black font-bold px-8 py-3 rounded shadow hover:bg-gray-200 border-2 border-white">
                    Pricing
                  </button>
                  <button className="bg-transparent text-white font-bold px-8 py-3 rounded border-2 border-white hover:bg-white hover:text-black">
                    Projects
                  </button>
                </div>
              </div>
              <div className="flex justify-center w-full">
                <img src="projects/hero-vector.png" alt="Creative IT" className="rounded-lg shadow-lg max-w-full" />
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
