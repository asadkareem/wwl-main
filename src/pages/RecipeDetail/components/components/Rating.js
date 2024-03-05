import React, {useEffect, useState} from 'react';
import {StarIcon} from "@heroicons/react/outline";
import {StarIcon as StarIconFilled} from "@heroicons/react/solid";
import {getRequest, postRequest} from "../../../../redux/wwlAPI";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../../../redux/user/userSlice";
import {toast} from "react-hot-toast";

const Rating = ({id, handleNullUser}) => {
  const [stars, setStars] = useState([]);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const selectedIcon = <StarIconFilled className='w-6 text-wwlYellow'/>;
  const deselectedIcon = <StarIcon className='w-6 text-wwlYellow'/>;
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 5; i++) {
      newStars.push(i + 1);
    }
    setStars(newStars);
  }, []);

  useEffect(() => {
    if (id && !isFetching && currentUser){
      setIsFetching(true);
      getRequest(`/ratings/get_rating/${id}`, {}).then(res => {
        setRating(res.data.score || 0);
        setIsFetching(false)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const changeRating = async (newRating) => {
    if (!currentUser) {
      handleNullUser();
      return
    }
    setRating(newRating);
    try {
      await postRequest('/ratings', {score: newRating, recipe: id})
      toast.success('Rating saved');
    } catch (e) {
      toast.error('Something went wrong');
      console.log(e);
    }
  }

  const hoverRating = (rating) => {
    setHovered(rating);
  }
  return (
    <div className='mr-10 lg:mr-0'>
      <p className='font-chivo text-xs whitespace-nowrap mb-2'>Rate this recipe</p>
      <div className="flex">
        {stars.map(star => {
          return (
            <span
              key={`star-${star}`}
              style={{cursor: 'pointer'}}
              onClick={() => {
                changeRating(star).catch(e => console.error(e));
              }}
              onMouseEnter={() => {
                hoverRating(star);
              }}
              onMouseLeave={() => {
                hoverRating(0);
              }}
            >
              {rating < star ?
                hovered < star ? deselectedIcon : selectedIcon
                : selectedIcon
              }
            </span>
          );
        })}
      </div>
    </div>
  )
}

export default Rating;