import React from "react";

const HeroSection = () => {
  return (
    <main id="content">
      <div className="bg-gradient-to-r from-neutral-900 via-gray-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-24 lg:pt-36 pb-24 text-center">
          <h1 className="font-extrabold text-white text-4xl md:text-6xl leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              Essential Tools for Developers
            </span>
            <br />
            <span className="text-neutral-200">
              Transforming <span className="text-yellow-400">Ideas</span> into{" "}
              <span className="text-yellow-400">Reality</span>
            </span>
          </h1>
          <p className="mt-6 text-neutral-300 text-lg md:text-xl max-w-4xl mx-auto">
            Welcome to our essential tool series. Explore innovative solutions
            tailored to enhance your productivity, accelerate development, and
            transform your boldest ideas into impactful realities.
          </p>
          <div className="mt-10 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <a
              href="#projects"
              className="px-8 py-4 bg-yellow-500 text-neutral-900 font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition"
            >
              Explore Tools
            </a>
            <a
              href="https://meet-sushil-kumar.vercel.app"
              className="px-8 py-4 bg-neutral-800 text-white font-semibold rounded-lg border border-yellow-500 hover:border-yellow-400 hover:bg-neutral-700 transition"
            >
              Learn More (about me)
            </a>
          </div>
        </div>
        {/* Decorative Background Elements */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="absolute top-0 left-0 transform -translate-x-2/3 -translate-y-1/3 opacity-30"
              width="600"
              height="600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="300" cy="300" r="300" fill="url(#gradient)" />
              <defs>
                <radialGradient
                  id="gradient"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="rotate(45) scale(1.5)"
                >
                  <stop stopColor="#FBBF24" offset="0%" />
                  <stop stopColor="#F59E0B" offset="100%" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
