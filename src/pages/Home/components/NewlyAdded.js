import React, {useEffect, useState} from 'react';
import CelebrationIcon from "../assets/celebration.png";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import HorizontalScroller from "./HorizontalScroller";
import {useDispatch} from "react-redux";
import { getNewlyAddedRecipes} from "../../../redux/recipe/recipesThunk";
import Loader from "../../../components/Loader";
import RecipeDetailModal from "../../../components/RecipeDetailModal";
import {ArrowRightIcon} from "@heroicons/react/solid";

const NewlyAdded = ({isTouchScreen}) => {
  const [open, setOpen] = useState(false);
  const [modalLoader, setModalLoader] = useState(false)
  const dispatch = useDispatch()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)

    async function fetchData() {
      try {
        const data = await dispatch(getNewlyAddedRecipes()).unwrap();
        setRecipes(data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchData().then(e => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (<div className='bg-wwlWhite border border-wwlBorderColor rounded-2xl xl:rounded-3xl p-6 mt-6'>
    <div className='mb-6 flex justify-between items-center'>
      <div className='flex items-center'>
        <img className='inline-block mr-3' src={CelebrationIcon} alt={'celebration icon'}/>
        <h2 className='font-chivo font-black text-base lg:text-xl'>Newly Added<span
          className='inline-block'></span></h2>
      </div>
      {/*<div className='hidden lg:block ml-8'>*/}
      {/*  <NavigationLink url={'/shopping-list'} LinkIcon={ShoppingCartIcon} linkText='Get the Shopping List'*/}
      {/*                  extraClasses='hidden lg:block bg-wwlGreen text-wwlDarkBlue mr-4 border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen'/>*/}
      {/*</div>*/}
    </div>
    {loading ? <Loader/> :  <div className='relative'><div className="text-center bounce absolute right-[-16px] top-[35%] -translate-y-1/2 block sm:hidden">
      <ArrowRightIcon className='h-4 w-4 text-wwlOrange'/>
    </div><HorizontalScroller isTouchScreen={isTouchScreen} extraClass='gap-6'>
      {recipes.length > 0 ? recipes.map((recipe) => <RecipeCard setModalLoader={setModalLoader} key={`${recipe.id}${recipe.title}`} recipe={recipe} setOpen={setOpen}/>) : <p className="font-base font-inter text-lg text-wwlGray500 text-center">No featured recipes</p>}
    </HorizontalScroller></div>}
    {/*<div className='lg:hidden mt-10 text-center'>*/}
    {/*  <NavigationLink url={'/shopping-list'} LinkIcon={ShoppingCartIcon} linkText='Get the Shopping List'*/}
    {/*                  extraClasses='bg-wwlGreen text-wwlDarkBlue border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen px-12'/>*/}
    {/*</div>*/}
    <RecipeDetailModal modalLoader={modalLoader} open={open} setOpen={setOpen}/>
  </div>);
};

export default NewlyAdded;