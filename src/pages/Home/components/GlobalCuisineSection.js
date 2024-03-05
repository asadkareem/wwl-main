import React from 'react';
import GlobalCuisineCard from "./GlobalCuisineCard";
import {Link} from "react-router-dom";
import {ArrowNarrowRightIcon} from "@heroicons/react/solid";

const GlobalCuisineSection = ({globalCuisine}) => {
  return (
    <div className='mt-10 px-6 py-12 relative' style={{background: 'linear-gradient(180deg, rgba(255, 208, 50, 0.79) 0%, rgba(210, 216, 44, 0.79) 100%)'}}>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='font-pridi font-bold text-wwlDarkBlue text-xl'>Meals Inspired By Our Favorite Global Cuisines</h1>
        <Link to={'/explore-recipes'} className='hidden xl:inline-block whitespace-nowrap font-chivo'>
          View All Recipes <ArrowNarrowRightIcon className='h-4 inline-block'/>
        </Link>
      </div>
      <div className='flex relative justify-center'>
        <div className='flex flex-wrap justify-center gap-x-4 gap-y-6 pt-10 xl:max-w-4xl'>
          {
            globalCuisine.map((cuisine, index) => {
              return (
                <GlobalCuisineCard key={index} globalCuisineTitle={cuisine}/>
              )
            })
          }
        </div>
        {/*<div className='hidden xl:block absolute right-0 -bottom-36'>*/}
        {/*  <img src={EarthFullIcon} className=''/>*/}
        {/*</div>*/}
      </div>
      {/*<div className='text-center mt-8 xl:hidden'>*/}
      {/*  <NavLink to='#' className='text-wwlDarkBlue font-chivo font-medium  text-sm'>See More</NavLink>*/}
      {/*</div>*/}
    </div>
  );
};

export default GlobalCuisineSection;