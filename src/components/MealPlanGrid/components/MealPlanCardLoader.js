import React from 'react';
import EditIcon from "../../../pages/CreateMealPlan/assets/edit.svg";
import {ArrowRightIcon} from "@heroicons/react/solid";
import Button from "../../Button";

const MealPlanCardLoader = () => {
  return (
    <div className='aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/4] bg-wwlWhite border rounded-xl overflow-hidden relative'>
      <div className='h-[33%] sm:h-[50%] lg:h-[33%]  relative'>
        <div className='w-full h-full bg-wwlGray400 flex justify-center items-center'></div>
        <div className={`absolute  left-2  p-1 rounded-full border cursor-pointer border-transparent bg-wwlBlue -bottom-4`}>
          <img src={EditIcon} alt="edit-icon" className='w-6 h-6' />
        </div>
      </div>
      <div className={`pt-3 py-2 px-2 lg:py-5 text-sm lg:text-base text-wwlGray400`}>
        <h1 className='font-sourcesanspro leading-5'>Coffee Coconut Breakfast Cookies</h1>
        <h3 className='font-hind mt-1'>15 mins</h3>

      </div>
      <div className='bg-wwlWhite flex w-full justify-center absolute bottom-0 left-1/2 transform -translate-x-1/2'>
        <Button btnText={'View Recipe'} extraClasses={`border-0 text-wwlGray400`} iconPositionRight={false} BtnIcon={ArrowRightIcon} iconExtraClasses='ml-2' />
      </div>
    </div>

  );
};

export default MealPlanCardLoader;