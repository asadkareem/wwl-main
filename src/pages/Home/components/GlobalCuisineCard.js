import React from 'react';
import ContainerImage from "../assets/circular-container.png";
import {Link} from "react-router-dom";
import {arrayToQueryParamString, truncateText} from "../../../utilis/generalUtilis";

const GlobalCuisineCard = ({globalCuisineTitle}) => {
  const dataArray = [{
    tag: globalCuisineTitle,
    type: null
  }]
    return (
      <Link to={`/search?page=1&keyword=${arrayToQueryParamString(dataArray)}`} className='h-fit rounded-full relative inline-block group cursor-pointer'>
          <img src={ContainerImage} alt="container"/>
          <h1 className='group-hover:text-wwlOrange group-hover:-rotate-12  transition-all duration-300 absolute top-2/4 left-2/4 text-base -translate-x-2/4 -translate-y-2/4 font-chivo font-black text-wwlDarkBlue'>{globalCuisineTitle === 'Mediterranean' ? truncateText(globalCuisineTitle, 9) : globalCuisineTitle}</h1>
      </Link>
    );
};

export default GlobalCuisineCard;