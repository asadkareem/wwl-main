import React, {useState} from 'react';
import SeeAll from "./SeeAll";
import HorizontalScroller from "./HorizontalScroller";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import RecipeDetailModal from "../../../components/RecipeDetailModal";
import {ArrowRightIcon} from "@heroicons/react/solid";

const TeamRecipeCollections = ({recipeCollections, isTouchScreen, loading, setPage}) => {
  const [open, setOpen] = useState(false);
  const [modalLoader, setModalLoader] = useState(false)

  function handlePage(){
    setPage(prev=>prev+1)
  }
  return (
    <>
      <div className='bg-wwlWhite mt-2 md:mt-4 p-6 border border-wwlBorderColor rounded-2xl xl:rounded-3xl relative'>
        <p
          className='block font-chivo text-sm bg-wwlYellowDim inline-block text-wwlDarkBlue rounded-full py-1 px-5'>Curated
          For You!</p>
        <h1 className='mt-4 font-pridi font-bold text-wwlOrange text-xl'>WWL Recipe Collections</h1>
        <p className='mt-2 font-chivo text-sm text-wwlBlack'>Each season, our team produces fun,
          situational, special
          recipe collections to help you gain meal planning and prep inspiration!</p>
        {recipeCollections && recipeCollections.map((recipe, index) => {
          return (
            <div key={`${recipe.title}${index}`} className='relative'>
              <div className="text-center bounce absolute right-[-16px] top-[35%] -translate-y-1/2 block sm:hidden">
                <ArrowRightIcon className='h-4 w-4 text-wwlOrange'/>
              </div>
              <SeeAll title={recipe.title}/>
              <HorizontalScroller isTouchScreen={isTouchScreen} extraClass='gap-6'>
                {recipe.recipes.map((recipe, index) => <RecipeCard setModalLoader={setModalLoader} setOpen={setOpen}
                                                                   key={`${recipe.id}${index}`} recipe={recipe} isTouchScreen={isTouchScreen}/>)}
              </HorizontalScroller>
            </div>
          )
        })}
        {loading ? <div className='py-1 px-8 border-wwlOrange mx-auto max-w-sm rounded-lg mt-10 border md:w-32'>
          <Loader height='29' width='29'/>
        </div> : <Button btnText={'See More'} onClick={() => {handlePage()}}
                         extraClasses='text-wwlWhite bg-wwlOrange rounded-lg mt-4 border border-transparent hover:text-wwlOrange hover:bg-wwlWhite hover:border-wwlOrange md:w-32'/>}
      </div>
      <RecipeDetailModal modalLoader={modalLoader} open={open} setOpen={setOpen}/>
    </>
  );
};

export default TeamRecipeCollections;