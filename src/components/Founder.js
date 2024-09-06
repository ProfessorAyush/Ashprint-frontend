import React from 'react';

const FounderPage = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-10 rounded-lg shadow-xl w-full max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-8">Founders</h2>
        
        <div className="flex flex-col md:flex-row md:space-x-8 items-center">
          {/* Founder 1 */}
          <div className="mb-8 md:mb-0 flex flex-col items-center text-center">
            <img
              src="https://via.placeholder.com/150" // Placeholder for Ayush's image
              alt="Ayush Aggarwal"
              className="w-32 h-32 rounded-full shadow-lg mb-4 transition-transform transform hover:scale-105"
            />
            <h3 className="text-2xl font-semibold mb-2">Ayush Aggarwal</h3>
            <p className="text-lg mb-4">B.Tech CSE Student at Sharda University</p>
            <a
              href="https://www.sharda.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Sharda University Profile
            </a>
          </div>
          
          {/* Founder 2 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="https://via.placeholder.com/150" // Placeholder for Vishal's image
              alt="Vishal Singh"
              className="w-32 h-32 rounded-full shadow-lg mb-4 transition-transform transform hover:scale-105"
            />
            <h3 className="text-2xl font-semibold mb-2">Vishal Singh</h3>
            <p className="text-lg mb-4">B.Tech CSE Student at Sharda University</p>
            <a
              href="https://www.sharda.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Sharda University Profile
            </a>
          </div>
        </div>
        
        {/* Go Home Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default FounderPage;
