import React from 'react';
import CategoryCard from "./CategoryCard";

const CategoryViewSection = ({categories}) => {
  return (
    <div className='md:pb-10' id='browse-all-categories'>
      <div className='md:flex mb-12 mt-6 md:justify-between items-center md:pr-16'>
        <h1 className='font-pridi font-bold text-xl px-6 mx-6'>Browse More Categories</h1>
      </div>
      <div className='flex flex-wrap justify-center gap-x-3 gap-y-10'>
        {
          categories.map((category, index) => {
            return (
              <CategoryCard key={index} categoryTitle={category}/>
            )
          })
        }
      </div>
    </div>
  );
};

export default CategoryViewSection;