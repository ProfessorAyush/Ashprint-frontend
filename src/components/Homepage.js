import React, { useState } from 'react';
import PrintForm from './PrintForm';
import { Link } from 'react-scroll';

const Homepage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleTryNowClick = () => {
    setIsFormOpen(true);
  };

  return (
    <section id="homepage" className="bg-black text-white min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          Welcome to <span className="text-yellow-400">Ashprint</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Ashprint is a cutting-edge automatic printing solution powered by Raspberry Pi and Python. Experience effortless printing like never before with advanced technology.
        </p>

        {/* Try Now Button */}
        <button
          onClick={handleTryNowClick}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-4 rounded-full font-medium hover:scale-105 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl"
        >
          Try Now
        </button>

        {/* Render PrintForm when button is clicked */}
        {isFormOpen && <PrintForm setIsFormOpen={setIsFormOpen} />}
      </div>

      {/* Scroll Down Button */}
      <Link
        to="about"
        smooth={true}
        duration={500}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black p-4 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-all duration-300"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7 7 7-7"></path>
        </svg>
      </Link>
    </section>
  );
};

export default Homepage;
