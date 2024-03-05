import React, {useEffect, useState} from 'react';
import CelebrationIcon from "../assets/celebration.png";
import RecipeCard from "../../../components/RecipeCard/RecipeCard";
import HorizontalScroller from "./HorizontalScroller";
import {useDispatch, useSelector} from "react-redux";
import {getFeaturedRecipes} from "../../../redux/recipe/recipesThunk";
import Loader from "../../../components/Loader";
import RecipeDetailModal from "../../../components/RecipeDetailModal";
import {ArrowRightIcon} from "@heroicons/react/solid";
import NavigationLink from "../../../components/NavigationLink";
import Button from "../../../components/Button";
import {hasMealPlaner, hasShoppingList} from "../../../redux/user/userSlice";
import GoProModal from "../../../components/GoProModal";

const ThisWeekPlan = ({isTouchScreen}) => {
    const [open, setOpen] = useState(false);
    const [goProModal, setGoProModal] = useState(false);
    const [modalLoader, setModalLoader] = useState(false)
    const dispatch = useDispatch()
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)

    const hasShoppingListPermission = useSelector(hasShoppingList);
    const hasMealPlanerPermission = useSelector(hasMealPlaner);
    const {currentUser} = useSelector((state) => state.user);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<div className='bg-wwlWhite border border-wwlBorderColor rounded-2xl xl:rounded-3xl p-6 mt-6'>
        <div className='flex justify-between items-center flex-wrap gap-3  mb-6'>
            <div className='flex items-center'>
                <img className='inline-block mr-3' src={CelebrationIcon} alt={'celebration icon'}/>
                <div>
                    <h2 className='font-chivo font-black text-base lg:text-xl'>This Week's Meal Plan <span
                        className='inline-block'></span></h2>
                    {recipes?.title && <h3 className='font-chivo font-medium text-sm'><span
                        className='font-bold pr-1'>(</span>{recipes?.title}<span className=' pl-1 font-bold'>)</span>
                    </h3>}
                </div>
            </div>
            <div className={`flex my-1 mb-3 gap-2`}>
                <div>
                    {hasMealPlanerPermission ?
                        <NavigationLink
                            url={`/meal-planning/meal-planner?mp=${recipes?._id}&t=${recipes?.title}`}
                            linkText='Open in Planner'
                            extraClasses='block bg-wwlOrange text-wwlWhite border-transparent hover:border-wwlOrange hover:bg-wwlWhite hover:text-wwlOrange'/> :
                        <NavigationLink url={`/this-weeks-meal-plan?mp=${recipes?._id}`} linkText={'View Meal Plan'}
                                        extraClasses='block bg-wwlOrange text-wwlWhite border-transparent hover:border-wwlOrange hover:bg-wwlWhite hover:text-wwlOrange'/>
                    }
                </div>
                <div>
                    {hasShoppingListPermission ?
                        <NavigationLink
                            url={`/shopping-list?mp=${recipes?._id}&t=${recipes?.title} (${currentUser.name} Version)`}
                            linkText={'View Shopping List'}
                            extraClasses='block bg-wwlGreen text-wwlDarkBlue border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen'/> :
                        <Button btnText={'View Shopping List'}
                                smallButton={true}
                                extraClasses='block border rounded-lg bg-wwlGreen text-wwlDarkBlue border-transparent hover:border-wwlGreen hover:bg-wwlWhite hover:text-wwlGreen'
                                onClick={() => setGoProModal(true)}
                        />}
                </div>

            </div>
        </div>
        {loading ? <Loader/> : <div className='relative'>
            <div className="text-center bounce absolute right-[-16px] top-[35%] -translate-y-1/2 block sm:hidden">
                <ArrowRightIcon className='h-4 w-4 text-wwlOrange'/>
            </div>
            <HorizontalScroller isTouchScreen={isTouchScreen} extraClass='gap-6'>
                {recipes.recipes?.length > 0 ? recipes.recipes.map((recipe) => <RecipeCard
                        setModalLoader={setModalLoader}
                        key={`${recipe.id}${recipe.title}`}
                        recipe={recipe}
                        isTouchScreen={isTouchScreen}
                        setOpen={setOpen}/>) :
                    <p className="font-base font-inter text-lg text-wwlGray500 text-center">No recipes</p>}
            </HorizontalScroller></div>}
        <RecipeDetailModal modalLoader={modalLoader} open={open} setOpen={setOpen}/>
        <GoProModal open={goProModal} setOpen={setGoProModal}/>
    </div>);
};

export default ThisWeekPlan;