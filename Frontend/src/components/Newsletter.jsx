// components/Newsletter.jsx
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Side - Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-2">
            <span className="inline-block px-4 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full uppercase tracking-wider">
              Limited Time Offer
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Subscribe now & get <span className="text-red-600">20% off</span>
          </h2>
          
          <p className="text-gray-600 text-base mb-6 leading-relaxed">
            Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-red-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>

          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No spam</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Unsubscribe anytime</span>
            </div>
          </div>
        </div>

        {/* Right Side - Image/Illustration */}
        <div className="relative bg-gradient-to-br from-red-500 to-red-700 p-8 md:p-12 flex items-center justify-center min-h-[250px] md:min-h-full">
          <div className="text-center text-white">
            <div className="mb-4">
              <svg className="w-24 h-24 mx-auto text-white/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Special Offer!</h3>
            <p className="text-white/90 text-sm">
              Get 20% off on your first order
            </p>
            <div className="mt-4 inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full">
              <span className="text-2xl font-bold">20% OFF</span>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;