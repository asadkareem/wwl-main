import React from 'react';
import ContainerImage from '../assets/container.svg'
import {Link} from "react-router-dom";
import {arrayToQueryParamString} from "../../../utilis/generalUtilis";

const CategoryCard = ({categoryTitle}) => {
    const dataArray = [{
      tag: categoryTitle,
      type: 'recipe'
    }]
    return (
        <Link to={`/search?page=1&keyword=${arrayToQueryParamString(dataArray)}`} className='rounded-b-full relative inline-block group cursor-pointer text-center'>
            <img src={ContainerImage} alt="container"/>
            <h1 className='group-hover:text-wwlOrange group-hover:-rotate-12  transition-all duration-300 absolute top-2/4 left-2/4 text-base -translate-x-2/4 -translate-y-2/4 font-chivo font-black text-wwlDarkBlue'>{categoryTitle}</h1>
        </Link>
    );
};

export default CategoryCard;