'use client'
import React, { useState } from 'react';

const About = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="mb-6">
              <p className="text-green-400 font-semibold mb-4 underline underline-offset-8">Get To Know</p>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              We Do Design, Code & Develop Software Finally Launch.
            </h3>
            <p className="text-gray-600 mb-8">
              Integer purus odio, placerat nec rhoncus in, ullamcorper nec dolor. Class onlin aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos only himenaeos. Praesent nec neque at dolor venenatis consectetur eu quis ex. the Donec lacinia placerat felis non aliquam.
            </p>
            <div className="bg-gradient-to-br from-emerald-200/60 to-emerald-400/40 p-[1px] rounded-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-semibold">&lt;/&gt;</span>
                    <span className="text-base font-semibold text-gray-900">The CodeGrammer</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">#1</span>
                </div>
                <div className="mt-5">
                  <p className="text-2xl md:text-3xl font-semibold leading-snug text-gray-900">
                    Best Creative IT Agency And Solutions
                    <br />
                    <span className="text-emerald-500">Since 2005.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Overlapping image frames */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Larger background frame */}
              <div className="w-96 h-80 bg-gray-200 rounded-lg shadow-lg overflow-hidden relative">
                <img
                  src="/projects/about-baner-1.jpeg"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Smaller overlapping frame with video */}
              <div className="absolute -bottom-8 -right-8 w-64 h-48 bg-gray-300 rounded-lg shadow-xl overflow-hidden cursor-pointer" onClick={openVideoModal}>
                <img src="/projects/about-baner-2.jpeg" alt="Team collaboration" className="w-full h-full object-cover" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-20 hover:bg-opacity-30 transition-all">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            {/* Close button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            >
              ×
            </button>

            {/* Video container */}
            <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/eZh5BeAZ9Hw?si=Ahc3GPGyosy0Xgtp&autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
