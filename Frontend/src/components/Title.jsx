import React from 'react';

function Title({ text1, text2 }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold tracking-wide uppercase text-white">
      {text1} <span className="text-emerald-400">{text2}</span>
    </h2>
  );
}

export default Title;