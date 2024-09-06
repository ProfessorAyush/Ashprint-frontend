import React, { useState } from 'react';
import { Link } from 'react-scroll';
import PrintForm from './PrintForm'; // Import PrintForm component

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // State to handle PrintForm

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleTryNowClick = () => {
    setIsFormOpen(true);
    setIsOpen(false); // Close mobile menu if open
  };

  return (
    <>
      <nav className="bg-black text-white py-4 fixed top-0 left-0 w-full z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6 lg:px-12">
          {/* Logo */}
          <Link to="homepage" smooth={true} duration={500} className="text-4xl font-extrabold tracking-wide hover:text-yellow-400 transition-colors duration-300">
            ASHPRINT
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg font-medium">
            <Link to="about" smooth={true} duration={500} className="hover:text-gray-400 transition-colors duration-300">
              About
            </Link>
            <Link to="timeline" smooth={true} duration={500} className="hover:text-gray-400 transition-colors duration-300">
              Timeline
            </Link>
            <button
              onClick={handleTryNowClick}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-500 transition-all duration-300"
            >
              Try Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-lg font-medium">
              {isOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
            <Link to="about" smooth={true} duration={500} className="hover:text-gray-400 transition-colors duration-300">
              About
            </Link>
            <Link to="timeline" smooth={true} duration={500} className="hover:text-gray-400 transition-colors duration-300">
              Timeline
            </Link>
            <button
              onClick={handleTryNowClick}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-medium hover:bg-yellow-500 transition-all duration-300"
            >
              Try Now
            </button>
          </div>
        )}
      </nav>

      {/* Render PrintForm when "Try Now" is clicked */}
      {isFormOpen && <PrintForm setIsFormOpen={setIsFormOpen} />}
    </>
  );
};

export default Navbar;
