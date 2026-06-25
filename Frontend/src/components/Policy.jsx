// components/Policy.jsx
import React from 'react';

const Policy = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2 tracking-wide">
        OUR POLICY
      </h2>
      <p className="text-center text-gray-600 text-lg mb-8 font-medium">
        Customer-Friendly Policies – Committed to Your Satisfaction and Safety
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Policy Card 1 */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Easy Exchange Policy
          </h3>
          <p className="text-gray-600 text-center text-sm">
            Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.
          </p>
        </div>

        {/* Policy Card 2 */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 rounded-full p-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            7 Days Return Policy
          </h3>
          <p className="text-gray-600 text-center text-sm">
            Shop with Confidence – 7 Days Easy Return Guarantee.
          </p>
        </div>

        {/* Policy Card 3 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-100 rounded-full p-3">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
            Best Customer Support
          </h3>
          <p className="text-gray-600 text-center text-sm">
            Trusted Customer Support – Your Satisfaction Is Our Priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;