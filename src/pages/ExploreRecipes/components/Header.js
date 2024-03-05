import React from 'react';

const gradientOuter = {
  background: 'linear-gradient(180deg, #D2D82C 0%, rgba(255, 208, 50, 0) 100%)'
}

const gradientInner = {
  background: 'linear-gradient(180deg, rgba(210, 216, 44, 1) 0%, rgba(255, 255, 255, 1) 100%)'
}

const Header = () => {
  return (
    <div className='py-10 pb-0 pt-0' style={gradientOuter}>
      <div className='pt-20  px-10 2xl:px-16 flex justify-between'
           style={gradientInner}>
        <div className='max-w-2xl'>
          <h1 className='font-pridi font-semibold text-4xl lg:ml-10 mb-24 lg:ml-10'>We’re committed to bringing you easy, no-stress, delicious
            food. </h1>
          <h1 className='font-chivo text-4xl'>Browse All Recipes</h1>
        </div>
        <div>
          {/*<img src={RecipeBookImage} alt=""/>*/}
        </div>
      </div>
    </div>
  );
};

export default Header;