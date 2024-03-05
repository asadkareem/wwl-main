import React, {useEffect, useState} from 'react';
import MealPlanningCard from "./components/MealPlanningCard";
import NoteIcon from './assets/icons/note-icon.png';
import WatchTimeIcon from './assets/icons/watch-time.svg'
import WwlLogo from './assets/images/wwl-logo.png'
import NavigationLink from "../../components/NavigationLink";
import {hasBasicPlan} from "../../redux/user/userSlice";
import {useSelector} from "react-redux";
import GoProModal from "../../components/GoProModal";

const MealPlanning = () => {
  const hasMealPlanAccess = useSelector(hasBasicPlan);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if(hasMealPlanAccess){
      setShowModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='mt-10 bg-wwlWhite pb-6 rounded-2xl p-6'>
        <div className='p-4'>
          <h1 className='font-chivo font-semibold text-3xl mb-4 md:text-4xl md:font-bold'>Meal Planning</h1>
        </div>
        <div className='grid grid-rows-3 xl:grid-cols-3 xl:grid-rows-1'>
          <MealPlanningCard mealPlanInfo='Revisit Your Favorites'
                            mealPlanTitle='Your Past Meal Plans'
                            mealPlanDescription="Access the meal plans you' ve created in the past to revisit or recycle a
                          favorite week's meals!"
                            cardBtnExtraStyles='bg-wwlOrange text-wwlWhite group-hover:border-wwlOrange  group-hover:text-wwlOrange'
                            mealPlanImage={WatchTimeIcon}
                            cardBtnText='View Your Meal Plans'
                            url='my-meal-plans?page=1'/>
          <MealPlanningCard
            mealPlanInfo='Curated By Our Team'
            mealPlanTitle='WWL Meal Plans'
            mealPlanDescription="We' ve planned your week so you
                          don't have to. Check out our past WWL curated meal plans for when you need something already planned."
            cardBtnText='Check Out WWL Meal Plans'
            cardBtnExtraStyles='bg-wwlDarkBlue text-wwlWhite group-hover:border-wwlDarkBlue group-hover:text-wwlDarkBlue'
            mealPlanImage={WwlLogo}
            url='wwl-plans?page=1'/>
          <MealPlanningCard mealPlanInfo='Customize Your Week'
                            mealPlanTitle='Create Your Own'
                            mealPlanDescription='Wanna build a custom meal plan for the week ahead? Use our Meal Planner tool and automatically have your grocery list updated with required ingredients.'
                            cardBtnText='Start Building Your Week'
                            cardBtnExtraStyles='bg-wwlGreen text-wwlDarkBlue
                          group-hover:border-wwlGreen group-hover:text-wwlDarkBlue'
                            mealPlanImage={NoteIcon}
                            url='meal-planner'/>
        </div>
        <div className='w-full mt-10'>
          <div className='text-center'>
            <h2 className='text-xl font-bold font-chivo'>While you're here, have you joined our Facebook Group?</h2>
            <p className=' leading-5 text-wwlGray500 mt-2 max-w-2xl mx-auto'>With nearly 7,000 members across the globe
              sharing tips, tricks and
              favorite recipes (or their own!), you're sure to find tons of inspiration for planning your
              week. 💪</p>
          </div>
          <div className='flex flex-col xs:flex-row justify-center items-center mt-5'>
            <NavigationLink url={'/explore-recipes'}  linkText='Back to Explore Recipes' extraClasses='text-wwlOrange mr-4 mb-4 xs:mb-0 rounded-lg border border-wwlOrange hover:text-wwlWhite hover:bg-wwlOrange hover:border-transparent px-8'/>
            <a href='https://www.facebook.com/groups/workweekpreppers ' rel={'noreferrer'} target='_blank' className='whitespace-nowrap rounded-lg py-2 px-4 font-chivo text-sm border transition-colors duration-300 text-wwlWhite bg-wwlOrange rounded-lg border border-transparent hover:text-wwlOrange hover:bg-transparent hover:border-wwlOrange'>Join the Group</a>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <GoProModal open={showModal} setOpen={setShowModal}/>
    </>
  );
};

export default MealPlanning;