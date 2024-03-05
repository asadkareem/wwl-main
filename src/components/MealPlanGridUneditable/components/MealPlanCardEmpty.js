import React from 'react';
import {PlusIcon} from "@heroicons/react/solid";
import SadFaceImage from '../../../pages/CreateMealPlan/assets/sad-face.png'

const MealPlanCardEmpty = () => {
    return (
        <div
            className='w-full bg-wwlWhite border rounded-xl overflow-hidden relative flex flex-col justify-between h-[190px] sm:h-[180px] md:h-[200px] lg:h-full'>
            <div className='h-[33%] sm:h-[36%] hidden sm:flex grow lg:hidden xl:flex relative'>
                <img src={SadFaceImage} alt="recipe"
                     className='h-full mx-auto pointer-events-none'/>
            </div>
            <div className='p-2'>
                <h1 className='font-sourcesanspro leading-5'>Empty</h1>
                <h3 className='font-hind mt-1 text-xs'>Click button below to add recipe.</h3>
            </div>
            <div className='p-2 w-full flex items-center justify-center'>
                <div
                    className='p-2 w-full flex  items-center justify-center border border-wwlOrange bg-wwlOrange text-white rounded-md transition-all'>
                    <PlusIcon className='h-4'/>
                </div>
            </div>
        </div>
    );
};

export default MealPlanCardEmpty;