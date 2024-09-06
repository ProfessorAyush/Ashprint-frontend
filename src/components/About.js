import React from 'react';
import { Link } from 'react-scroll';

const About = () => {
  return (
    <section id="about" className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen flex flex-col items-center py-16 px-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-40"></div>

      {/* Content of the About section */}
      <div className="container mx-auto max-w-4xl relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-center leading-tight">
          About Ashprint
        </h1>
        <p className="text-lg md:text-xl mb-12 text-center max-w-2xl mx-auto">
          Ashprint revolutionizes printing with a seamless, automatic process. Discover how our innovative solution transforms the printing experience:
        </p>

        <div className="bg-white text-black rounded-lg shadow-xl overflow-hidden mx-auto transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="relative p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-black text-white text-xl font-bold rounded-full">
                  1
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Scan the QR Code</h3>
                  <p className="text-base md:text-lg">Use your device to scan the QR code from our site or printed materials to start the process.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-black text-white text-xl font-bold rounded-full">
                  2
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Fill Out the Form</h3>
                  <p className="text-base md:text-lg">Complete the form with your details and upload your document. Ensure all information is accurate.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-black text-white text-xl font-bold rounded-full">
                  3
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Make the Payment</h3>
                  <p className="text-base md:text-lg">Choose your payment method and complete the transaction securely with various options available.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-black text-white text-xl font-bold rounded-full">
                  4
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">Get Your Prints</h3>
                  <p className="text-base md:text-lg">Your prints will be processed and delivered according to your chosen option. Enjoy hassle-free printing!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Up Button */}
      <Link
        to="homepage"
        smooth={true}
        duration={500}
        className="fixed bottom-8 right-8 bg-white text-black p-4 rounded-full shadow-lg cursor-pointer hover:bg-gray-200 transition-all duration-300"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7-7-7 7"></path>
        </svg>
      </Link>
    </section>
  );
};

export default About;
