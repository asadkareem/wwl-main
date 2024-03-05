import React from 'react';
import {useNavigate} from "react-router-dom";

const lineBreakStyles = {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2
}
// eslint-disable-next-line react-hooks/rules-of-hooks
const MealPlanCard = ({item}) => {
    const navigate = useNavigate()
    return (
        <div
            className={`w-full bg-wwlWhite border rounded-xl relative flex flex-col justify-between parent h-[190px] sm:h-[180px] md:h-[200px] lg:h-full cursor-pointer`}
        onClick={() => {navigate(`/recipe-detail/${item.id || item._id}`)}}>
            <div className='h-[42%] sm:h-[50%] relative'>
                <div
                    className='w-full h-full bg-wwlGray400 flex justify-center items-center rounded-t-xl overflow-hidden'>
                    <img src={item?.primaryImage} alt="recipe"
                         className='w-full h-full object-cover pointer-events-none'/>
                </div>
            </div>
            <div
                className={`pt-3 py-2 px-2 xl:py-5 text-sm xl:text-base text-wwlBlack`}>
                <h1 className='font-sourcesanspro leading-5' style={lineBreakStyles}>{item.title}</h1>
                <div className='flex items-center justify-between mt-1 sm:mt-2 flex-wrap md:flex-wrap'>
                    <h3 className='font-hind mt-1 text-sm xl:text-base'>{item?.cook_time || item.cookTime} mins</h3>
                </div>
            </div>
        </div>
    );
};

export default MealPlanCard;