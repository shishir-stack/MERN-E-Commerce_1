import React from 'react';
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";

function Background({ heroCount }) {
  //  object-cover
  const imageClass = "absolute right-0 top-0 w-[50%] h-full object-cover object-center transition-all duration-500 ease-in-out";

  if (heroCount === 0) {
    return <img src={back2} alt="" className={imageClass} />;
  } else if (heroCount === 1) {
    return <img src={back1} alt="" className={imageClass} />;
  } else if (heroCount === 2) {
    return <img src={back3} alt="" className={imageClass} />;
  } else if (heroCount === 3) {
    return <img src={back4} alt="" className={imageClass} />;
  }

  return <img src={back1} alt="" className={imageClass} />;
}

export default Background;