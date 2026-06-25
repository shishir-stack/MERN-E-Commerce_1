import React, { useContext, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import Nav from '../components/Nav';         
import Sidebar from '../components/Sidebar'; 
import { AuthDataContext } from './../context/AuthContext';
import axios from 'axios';

export default function AddProduct() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(item => item !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  let { serverUrl } = useContext(AuthDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true });
      console.log(result.data);

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setSizes([]); 
        setBestseller(false);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative overflow-hidden flex flex-col">
      <Nav />
      <hr className="border-slate-800" />

      <div className="flex flex-col md:flex-row flex-1 w-full h-[calc(100vh-80px)] overflow-hidden">
        
       
        <div className="order-2 md:order-1">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto order-1 md:order-2 bg-black/10 text-gray-300">
          <div className="max-w-2xl mx-auto md:mx-0 pb-16 md:pb-0">
            <h2 className="text-lg sm:text-xl font-semibold mb-5 text-white text-center sm:text-left">
              Add Product Page
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div>
                <p className="text-sm font-medium mb-3 text-center sm:text-left">Upload Images</p>
               
                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  
                  {/* Image 1 */}
                  <label htmlFor="image1" className="w-16 h-16 sm:w-20 sm:h-20 bg-white text-emerald-600 rounded-md flex flex-col items-center justify-center cursor-pointer border border-dashed border-gray-400 overflow-hidden shrink-0">
                    {image1 ? <img src={URL.createObjectURL(image1)} className="w-full h-full object-cover" alt="preview" /> : <div className="text-center flex flex-col items-center"><FiUploadCloud className="text-lg sm:text-xl"/> <span className="text-[9px] sm:text-[10px] text-gray-500 mt-1">Upload</span></div>}
                    <input type="file" id="image1" hidden onChange={(e) => setImage1(e.target.files[0])} />
                  </label>

                  {/* Image 2 */}
                  <label htmlFor="image2" className="w-16 h-16 sm:w-20 sm:h-20 bg-white text-emerald-600 rounded-md flex flex-col items-center justify-center cursor-pointer border border-dashed border-gray-400 overflow-hidden shrink-0">
                    {image2 ? <img src={URL.createObjectURL(image2)} className="w-full h-full object-cover" alt="preview" /> : <div className="text-center flex flex-col items-center"><FiUploadCloud className="text-lg sm:text-xl"/> <span className="text-[9px] sm:text-[10px] text-gray-500 mt-1">Upload</span></div>}
                    <input type="file" id="image2" hidden onChange={(e) => setImage2(e.target.files[0])} />
                  </label>

                  {/* Image 3 */}
                  <label htmlFor="image3" className="w-16 h-16 sm:w-20 sm:h-20 bg-white text-emerald-600 rounded-md flex flex-col items-center justify-center cursor-pointer border border-dashed border-gray-400 overflow-hidden shrink-0">
                    {image3 ? <img src={URL.createObjectURL(image3)} className="w-full h-full object-cover" alt="preview" /> : <div className="text-center flex flex-col items-center"><FiUploadCloud className="text-lg sm:text-xl"/> <span className="text-[9px] sm:text-[10px] text-gray-500 mt-1">Upload</span></div>}
                    <input type="file" id="image3" hidden onChange={(e) => setImage3(e.target.files[0])} />
                  </label>

                  {/* Image 4 */}
                  <label htmlFor="image4" className="w-16 h-16 sm:w-20 sm:h-20 bg-white text-emerald-600 rounded-md flex flex-col items-center justify-center cursor-pointer border border-dashed border-gray-400 overflow-hidden shrink-0">
                    {image4 ? <img src={URL.createObjectURL(image4)} className="w-full h-full object-cover" alt="preview" /> : <div className="text-center flex flex-col items-center"><FiUploadCloud className="text-lg sm:text-xl"/> <span className="text-[9px] sm:text-[10px] text-gray-500 mt-1">Upload</span></div>}
                    <input type="file" id="image4" hidden onChange={(e) => setImage4(e.target.files[0])} />
                  </label>

                </div>
              </div>

              
              <div className="w-full">
                <p className="text-sm mb-2">Product Name</p>
                <input value={name} onChange={(e)=>setName(e.target.value)} required type="text" placeholder="Type here..." className="w-full max-w-[500px] bg-transparent border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400" />
              </div>

             
              <div className="w-full">
                <p className="text-sm mb-2">Product Description</p>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} required placeholder="Write content here..." className="w-full max-w-[500px] bg-transparent border border-gray-600 rounded px-3 py-2 text-sm text-white h-24 resize-none focus:outline-none focus:border-emerald-400" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[500px]">
                <div className="flex-1">
                  <p className="text-sm mb-2">Category</p>
                  <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full bg-[#00141a] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div className="flex-1">
                  <p className="text-sm mb-2">Sub Category</p>
                  <select value={subCategory} onChange={(e)=>setSubCategory(e.target.value)} className="w-full bg-[#00141a] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none">
                    <option value="Topwear">Topwear</option>
                    <option value="Bottomwear">Bottomwear</option>
                    <option value="Winterwear">Winterwear</option>
                  </select>
                </div>

                <div className="flex-1">
                  <p className="text-sm mb-2">Price</p>
                  <input value={price} onChange={(e)=>setPrice(e.target.value)} required type="number" placeholder="25" className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400" />
                </div>
              </div>

            
              <div>
                <p className="text-sm mb-2">Product Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <div 
                      key={size} 
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1.5 border border-gray-600 rounded cursor-pointer transition-all text-xs font-semibold select-none
                        ${sizes.includes(size) ? 'bg-emerald-200 text-black border-emerald-400' : 'bg-transparent text-gray-300'}
                      `}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              
              <div className="flex gap-2 items-center mt-2">
                <input checked={bestseller} onChange={()=>setBestseller(!bestseller)} type="checkbox" id="bestseller" className="w-4 h-4 accent-emerald-500 cursor-pointer" />
                <label htmlFor="bestseller" className="text-sm cursor-pointer select-none">Add to Bestseller</label>
              </div>

              
              <div className="flex justify-center sm:justify-start">
                <button type="submit" className="w-full sm:w-32 bg-emerald-600 text-white font-medium py-2.5 rounded hover:bg-emerald-700 transition-all mt-4 active:scale-95">
                  ADD PRODUCT
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}