import { useState } from "react";

function BottomBar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-blue-500 to-teal-500 py-4 px-6 rounded-t-lg shadow-lg transform transition-all animate-slide-up">
        <div className="max-w-4xl mx-auto flex justify-between items-center text-white">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">
              🚀 Better Cards & Enhanced Descriptions Coming Soon!
            </h2>
            <p className="text-sm opacity-90">
              Stay tuned as I am working on creating improved cards with more engaging and detailed descriptions to elevate your experience :)
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-300 transition duration-200 ease-in-out"
            aria-label="Close Banner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 7.586l4.293-4.293a1 1 0 111.414 1.414L11.414 9l4.293 4.293a1 1 0 11-1.414 1.414L10 10.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 9 4.293 4.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  );
}

export default BottomBar;
