import React from 'react';
import RatingStarFull from '../assets/icons/star-filled.svg';

const ShowRating = ({avgRating, backgroundColor, StarIcon}) => {
    return (
        <div
            className={`${backgroundColor ? backgroundColor : 'bg-wwlTransparentYellow'} h-9 w-24 rounded-full flex items-center justify-between pl-4 pr-6`}>
            {StarIcon ? <StarIcon className='w-5 h-5'/> :
                <img src={RatingStarFull} alt="star" className="inline-block mr-2"/>}
            <h2 className="font-chivo text-wwlBlack font-normal">{avgRating?.toFixed(1)}</h2>
        </div>
    );
};

export default ShowRating;