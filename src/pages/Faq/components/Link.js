import React from 'react';

const Link = ({title, link, Icon }) => {
  return (
    <a href={link} target="_blank" className='group cursor-pointer bg-wwlWhite flex items-center justify-between px-4 md:px-10 py-4 rounded-lg shadow-wwlDefault font-chivo text-lg mb-4' rel={'noreferrer'}>
      <span className='group-hover:text-wwlOrange transition-colors duration-300 text-wwlBlack'>{title}</span>
      <Icon className="group-hover:text-wwlOrange transition-colors duration-300 h-6 w-6 text-wwlGray400"/>
    </a>
  );
};

export default Link;