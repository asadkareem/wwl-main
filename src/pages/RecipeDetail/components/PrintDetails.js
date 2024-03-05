import React from "react";
import RecipeIngredients from "./components/RecipeIngredients";

const PrintDetails = ({recipe, servingsCount}) => {
  return (
    <div className='bg-white hidden print-visible'>
      <h1 className='font-chivo font-bold text-2xl lg:text-2xl mt-4 lg:mt-0 text-center'>{recipe.title}</h1>
      <div className={`font-chivo flex justify-around px-4 py-6 mb-4 gap-6 w-3/4 mx-auto`}>
        <div className='text-center'>
          <h6 className='text-xs mb-2'>Serving Size</h6>
          <h4 className='text-base whitespace-nowrap sm:whitespace-normal'>{servingsCount}<br/></h4>
        </div>
        <div className='text-center'>
          <h6 className='text-xs mb-2'>Prep Time</h6>
          <h4 className='text-base whitespace-nowrap sm:whitespace-normal'>{recipe.prep_time}<br/> mins</h4>
        </div>
        <div className='text-center'>
          <h6 className='text-xs mb-2'>Cook Time</h6>
          <h4 className='text-base'>{recipe.cook_time}<br/> mins</h4>
        </div>
      </div>
      <div className='flex'>
        <div className='w-[30%] px-3'>
          <RecipeIngredients servings={recipe.servings}
                             servingsCount={servingsCount}
                             printable={true}
                             dataToRender={recipe?.default_ingredients}
                             title={'Ingredients'} dairyFree={false} glutenFree={false}/>
        </div>
        <div className='pr-3 w-[70%]'>
          <RecipeIngredients servingsCount={recipe.servings}
                             printable={true}
                             dataToRender={recipe?.default_instructions}
                             title={'Instructions'} dairyFree={false} glutenFree={false}/>
        </div>
      </div>
    </div>
  )
};

export default PrintDetails;