import React, {useEffect, useState} from 'react';
import CelebrationIcon from "../assets/celebration.png";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import {ShoppingCartIcon} from "@heroicons/react/outline";
import HorizontalScroller from "./HorizontalScroller";
import NavigationLink from "../../../components/NavigationLink";
import {useDispatch} from "react-redux";
import {getFeaturedRecipes} from "../../../redux/recipe/recipesThunk";
import Loader from "../../../components/Loader";
import RecipeDetailModal from "../../../components/RecipeDetailModal";


const FeaturedRecipes = ({isTouchScreen}) => {
    const [open, setOpen] = useState(false);
    const [modalLoader, setModalLoader] = useState(false)
    const dispatch = useDispatch()
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)

        async function fetchData() {
            try {
                const data = await dispatch(getFeaturedRecipes()).unwrap();
                setRecipes(data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchData().then(e => setLoading(false));
    }, []);


    return (<div className='bg-wwlWhite border border-wwlBorderColor rounded-2xl xl:rounded-3xl p-6'>
            <div className='mb-6 flex justify-between items-center'>
                <div className='flex items-center'>
                    <img className='inline-block mr-3' src={CelebrationIcon}/>
                    <h2 className='font-chivo font-black text-base lg:text-xl'>Featured Recipes From This Week’s <span
                        className='inline-block'>WWL Meal Plan</span></h2>
                </div>
                <div className='hidden lg:block ml-8'>
                    <NavigationLink url={'/shopping-list'} LinkIcon={ShoppingCartIcon} linkText='Get the Shopping List'
                                    extraClasses='hidden lg:block bg-wwlGreen text-wwlDarkBlue mr-4 border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen'/>
                </div>
            </div>
            {loading ? <Loader/> : <HorizontalScroller isTouchScreen={isTouchScreen}>
                {recipes.length > 0 ? recipes.map((recipe) => <RecipeCard setModalLoader={setModalLoader} key={`${recipe.id}${recipe.title}`} recipe={recipe} setOpen={setOpen}/>) : <p className="font-base font-inter text-lg text-wwlGray500 text-center">No featured recipes</p>}
            </HorizontalScroller>}
            <div className='lg:hidden mt-10 text-center'>
                <NavigationLink url={'/shopping-list'} LinkIcon={ShoppingCartIcon} linkText='Get the Shopping List'
                                extraClasses='bg-wwlGreen text-wwlDarkBlue border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen px-12'/>
            </div>
        <RecipeDetailModal modalLoader={modalLoader} open={open} setOpen={setOpen}/>
        </div>);
};

export default FeaturedRecipes;
