// components/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section with Image */}
      <div className="relative rounded-3xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop" 
          alt="About Us" 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About OneCart</h1>
          <p className="text-lg md:text-xl max-w-2xl text-white/90">
            Your trusted partner in online shopping since 2020
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">
            Revolutionizing Online Shopping
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            OneCart was founded with a simple mission: to make online shopping easy, secure, and enjoyable for everyone. 
            What started as a small startup in 2020 has grown into a trusted e-commerce platform serving thousands of happy customers.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            We believe in providing quality products at competitive prices, backed by exceptional customer service. 
            Our team works tirelessly to curate the best products and ensure a seamless shopping experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">100% Genuine Products</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">Free Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-700">24/7 Support</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop" 
            alt="Our Team" 
            className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
          />
          <div className="absolute -bottom-4 -right-4 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg">
            <p className="text-2xl font-bold">4.8★</p>
            <p className="text-sm">Customer Rating</p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
          <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To provide a seamless and trustworthy online shopping experience by offering quality products, 
            competitive prices, and exceptional customer service to customers across the globe.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg">
          <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become the most trusted and preferred online shopping destination worldwide, 
            known for our commitment to quality, innovation, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <div className="text-center mb-10">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">What Makes Us Different</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Quality Products</h4>
            <p className="text-gray-600 text-sm">Curated selection of premium products from trusted brands</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 1v1m0 1V7m-6 1h8" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Best Prices</h4>
            <p className="text-gray-600 text-sm">Competitive pricing with regular deals and discounts</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Expert Team</h4>
            <p className="text-gray-600 text-sm">Dedicated professionals committed to your satisfaction</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Quick Delivery</h4>
            <p className="text-gray-600 text-sm">Fast and reliable shipping to your doorstep</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <div className="text-center mb-10">
          <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Our Team</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">Meet Our Leadership</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "John Doe",
              role: "CEO & Founder",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
            },
            {
              name: "Jane Smith",
              role: "COO",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
            },
            {
              name: "Mike Johnson",
              role: "CTO",
              image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
            },
            {
              name: "Sarah Williams",
              role: "Head of Marketing",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
            }
          ].map((member, index) => (
            <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-100"
              />
              <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;