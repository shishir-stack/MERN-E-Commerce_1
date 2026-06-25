// pages/ProductDetail.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';
import { cartDataContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, currency } = useContext(shopDataContext);
  const { addToCart } = useContext(cartDataContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find(item => item._id === id);
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsAdding(true);
    await addToCart(id, selectedSize);
    setIsAdding(false);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0c2025] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c3f6fa] mx-auto"></div>
          <p className="mt-4 text-[#c3f6fa]">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c2025] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#80808049]">
            <img 
              src={product.image1 || product.image || 'https://placehold.co/600x600/1a1a1a/c3f6fa?text=No+Image'} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold text-[#c3f6fa] mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-gray-500 text-xl">★</span>
              </div>
              <span className="text-gray-400 text-sm">(124)</span>
            </div>

            <div className="text-2xl md:text-3xl font-bold text-[#c3f6fa] mb-4">
              {currency}{product.price}
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-6">
              {product.description || 'Best quality and daily use Product...'}
            </p>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#c3f6fa] mb-3">Select Size</h3>
              <div className="flex gap-3">
                {['S', 'M', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border-2 font-medium text-sm transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-[#c3f6fa] bg-[#c3f6fa] text-[#0c2025]'
                        : 'border-[#80808049] text-[#c3f6fa] hover:border-[#c3f6fa]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 mb-6 ${
                isAdding 
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                  : 'bg-[#c3f6fa] text-[#0c2025] hover:bg-[#a8e0e6]'
              }`}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>

            <div className="border-t border-[#80808049] pt-4 space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-300">100% Original Product</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-300">Cash on delivery available</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-300">Easy return within 7 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;