import  { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom'; 

function Card({ name, image, id, price }) {
  const { currency } = useContext(shopDataContext); 
  const navigate = useNavigate(); 

  
  const imageUrl = (image && typeof image === 'string' && image.trim() !== "") 
    ? image 
    : "https://placehold.co/600x400/0c2025/c3f6fa?text=No+Image";

  return (
    <div 
    
      onClick={() => navigate(`/productdetails/${id}`)} 
      className='w-[300px] max-w-[90%] sm:max-w-full h-[400px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049] transition-all duration-300 mx-auto sm:mx-0'
    >
      
      <img 
        src={imageUrl} 
        alt={name || "Product"} 
        className='w-full h-[80%] rounded-sm object-cover' 
        onError={(e) => {
          e.target.src = "https://placehold.co/600x400/0c2025/c3f6fa?text=Image+Not+Found";
        }}
      />
      
      <div className='text-[#c3f6fa] text-[18px] py-[10px] font-medium truncate w-full'>
        {name}
      </div>
      
      
      <div className='text-white font-semibold text-[16px]'>
        {currency} {price}
      </div>
      
    </div>
  );
}

export default Card;