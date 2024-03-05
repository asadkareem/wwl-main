import React, {useEffect, useState} from 'react';
import {selectCollections} from "../../redux/recipe/recipesSlice";
import {useDispatch, useSelector} from "react-redux";
import HandIcon from './assets/hand.png';
import TeamRecipeCollections from "./components/TeamRecipeCollections";
import CategoryViewSection from "./components/CategoryViewSection";
import GlobalCuisineSection from "./components/GlobalCuisineSection";
import Footer from "./components/Footer";
import Button from "../../components/Button";
import {ArrowCircleUpIcon} from "@heroicons/react/outline";
import {selectCurrentUser} from "../../redux/user/userSlice";
import {selectIsTouchScreen} from "../../redux/navigation/navigationSlice";
import {getAllCollections} from "../../redux/recipe/recipesThunk";
import Loader from "../../components/Loader";
import NewlyAdded from "./components/NewlyAdded";
import {memberfulAccount} from "../../redux/user/userThunk";
import ThisWeekPlan from "./components/ThisWeekPlan";

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const collections = useSelector(selectCollections);
  const isTouchScreen = useSelector(selectIsTouchScreen);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Freezer Friendly',
    'Under 30 Minutes',
    'Kid Friendly',
    'Beginner',
    'No Reheat',
    'Baked Goods',
    'Minimal Cooking',
    'Soup',
    'Salad',
    'Wraps & Sandwiches',
    'Breakfast'
  ];

  const cuisines = ['Mexican', 'Japanese', 'Korean', 'Chinese', 'Vietnamese', 'Indian', 'Italian', 'Mediterranean', 'Spanish', 'American', 'Thai']

  const [page, setPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await dispatch(getAllCollections(page));
    }

    fetchData().then(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dispatch])


  useEffect(() => {
    dispatch(memberfulAccount());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (currentUser === null) {
    return <Loader/>

  }
  return (
    <div className='mt-10 mx-6'>
      <div className='mb-6 pl-6'>
        <h1 className='font-pridi text-2xl'>
          Welcome, <span className='font-bold'>{currentUser?.name?.split(' ')[0]}</span><img
          className='inline-block ml-5' alt="" src={HandIcon}/></h1>
        <p className='text-base text-wwlGray600 hidden md:block'>Take a look below to explore recipes. Happy
          Prepping!</p>
      </div>
      {/*<FeaturedRecipes isTouchScreen={isTouchScreen}/>*/}
      <TeamRecipeCollections recipeCollections={collections.recipesCollections} isTouchScreen={isTouchScreen}
                             loading={loading}
                             setPage={setPage}/>
      <ThisWeekPlan isTouchScreen={isTouchScreen}/>
      <NewlyAdded isTouchScreen={isTouchScreen}/>
      <CategoryViewSection categories={categories}/>
      <GlobalCuisineSection globalCuisine={cuisines}/>
      <Footer/>
      <div className='mt-3 md:hidden'>
        <Button btnText={'Back to top'} onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }} extraClasses='text-wwlOrange' BtnIcon={ArrowCircleUpIcon} iconExtraClasses='mr-0'/>
      </div>
    </div>
  );
};

export default Home;