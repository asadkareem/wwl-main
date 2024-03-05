import React from 'react';
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import {hasMealPlaner} from "../../../redux/user/userSlice";
import {useSelector} from "react-redux";
import GoProModal from "../../../components/GoProModal";

const MealPlanningCard = ({
                            mealPlanInfo,
                            mealPlanTitle,
                            mealPlanDescription,
                            mealPlanImage,
                            cardBtnText,
                            cardBtnExtraStyles,
                            url
                          }) => {
  const hasMealPlanerAccess = useSelector(hasMealPlaner);
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div className='p-3 cursor-pointer'>
        <Link to={!hasMealPlanerAccess && mealPlanInfo==='Customize Your Week' ? "" : url} onClick={e=>!hasMealPlanerAccess && mealPlanInfo==='Customize Your Week' ? setOpen(true) : null}>
          <div
            className='p-6 flex flex-col sm:flex-row xl:flex-col items-center justify-center w-stretch h-full bg-wwlWhite rounded-3xl font-inter relative shadow-wwlDefault group gap-4 md:gap-0'>
            <div className='flex w-full items-center justify-center sm:max-w-[25%] sm:pr-2 xl:max-w-[100%] xl:pr-0'>
              <div className='xl:pb-9'>
                <img src={mealPlanImage} alt="meal-plan" />
              </div>
            </div>
            <div className='flex-grow flex flex-col'>
              <div className='flex-grow'>
                <p className='text-xs font-chivo text-wwlGray700'>{mealPlanInfo}</p>
                <h1 className='text-2xl font-semibold mb-2 text-wwlBlack font-pridi '>{mealPlanTitle}</h1>
                <h3 className='font-chivo text-xs  text-wwlGray500 '>{mealPlanDescription}</h3>
              </div>
              <Button btnText={cardBtnText} btnFilled={true} extraClasses={`max-w-[100%] rounded-lg mt-5 border border-transparent text-sm group-hover:bg-transparent hover:bg-transparent ${cardBtnExtraStyles}`} />
            </div>
          </div>
        </Link>
      </div>
      <GoProModal open={open} setOpen={setOpen}/>
    </>
  );
};

export default MealPlanningCard;