import React, {useState} from 'react';
import ShowRating from "../../ShowRating";
import {BookmarkIcon, HeartIcon, StarIcon} from "@heroicons/react/outline"
import {Link} from "react-router-dom";
import MealPlanMicroView from "../../MealPlanMicroView/MealPlanMicroView";
import {useDispatch, useSelector} from "react-redux";
import {addBookmarked, addFavorite} from "../../../redux/user/userThunk";
import {
  selectClickedOutside,
  selectCurrentUser,
  updateBookmarkedRecipes,
  updateFavoriteRecipes, updateSavedRecipes
} from "../../../redux/user/userSlice";
import {useLocation} from "react-router-dom";
import {toast} from "react-hot-toast";
import Loader from "../../Loader";

const lineBreakStyles = {
  overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3
}
//TODO : Remove unused props
const RecipeRow = ({item, currentTab, index}) => {
  const location = useLocation().pathname;
  const {title, primary_image, prep_time, cook_time, average_rating, _id} = item
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingHeart, setLoadingHeart] = useState(false);
  const clicked = useSelector(selectClickedOutside)
  const currentUser = useSelector(selectCurrentUser)
  const handleFavorite = async (e, index) => {
    setLoadingHeart(true)
    await dispatch(addFavorite(_id))
    const svgElement = e.target.closest('svg');
    svgElement.classList.toggle('fill-wwlOrange');
    if (location === '/saved-recipes') {
      dispatch(updateFavoriteRecipes(_id))
      if (index !== undefined) {
        dispatch(updateSavedRecipes({index, type: 'favorite'}))
      }
    } else {
      if (svgElement.classList.contains('fill-wwlOrange')) {
        toast.success('Recipe added to favorites')
      } else {
        toast.success('Recipe removed from favorites')
      }
    }
  }

  const handleBookmark = async (e, index) => {
    const svgElement = e.target.closest('svg');
    setLoading(true)
    await dispatch(addBookmarked(_id))
    if (location === '/bookmark-recipes') {
      dispatch(updateBookmarkedRecipes(_id));
      if (index !== undefined) {
        dispatch(updateSavedRecipes({index, type: 'bookmark'}))
      }
    }
    else {
      if (svgElement.classList.contains('fill-wwlOrange')) {
        svgElement.classList.remove('fill-wwlOrange')
        toast.success('Recipe added to Bookmarks')
      } else {
        svgElement.classList.add('fill-wwlOrange')
        toast.success('Recipe removed from Bookmarks')
      }
    }
  }
  return (<tr>
    <td className="pr-3 py-4 text-sm text-gray-500 group text-left sm:text-center lg:text-left  max-w-xs lg:max-w-sm">
      <Link to={`/recipe-detail/${item._id}`} className="flex items-center sm:flex-col lg:flex-row">
        {primary_image && <img
          alt="itemimg"
          src={primary_image}
          className="object-cover  w-16 h-16 rounded-full sm:rounded-xl sm:w-24 sm:h-16 md:w-24 md:h-20 xl:w-48 xl:h-40 mr-0 lg:mr-6"
        />}
        <div className='ml-4 sm:ml-0'>
          {title &&
            <h1
              className='group-hover:underline font-inter text-sm font-bold sm:font-normal text-wwlBlack sm:text-base sm:font-chivo xl:text-lg mt-0 sm:mt-2 lg:mt-0 px-0'
              style={lineBreakStyles}>{title}</h1>}
          {prep_time && <p className='font-inter block sm:hidden'>Prep time: {prep_time} min</p>}
          {cook_time && <p className='font-inter block sm:hidden'>Cook time: {cook_time} min</p>}
        </div>
      </Link>
    </td>

    <td className="table-cell sm:hidden whitespace-nowrap py-4 text-sm text-gray-500 sm:pr-4">
      {average_rating &&
        <ShowRating avgRating={average_rating} backgroundColor='bg-wwlGray100 sm:bg-wwlTransparentYellow'
                    StarIcon={StarIcon}/>}
      <div className='flex gap-3 mt-2 sm:mt-0 justify-center'>
        {currentTab === 'My Favorites' && <div className='h-5 block h-5 relative'>
          {loadingHeart &&
            <div className='bg-white absolute right-0'><Loader width='20px' height='20px'/></div>}
            <HeartIcon onClick={(e) => handleFavorite(e, index).then(() => setLoadingHeart(false))}
                       className={`h-5 block 5 text-wwlOrange cursor-pointer md:hover:fill-wwlOrange ${item.is_favorite ? 'fill-wwlOrange' : ''}`}/>
        </div>}

        {currentTab === 'Saved For Later' && <div className='h-5 block h-5 relative'>
          {loading && <div className='bg-white absolute right-0'><Loader width='20px' height='20px'/></div>}
          <BookmarkIcon onClick={e => handleBookmark(e, index).then(() => setLoading(false))}
                                              className={`w-5 h-5 text-wwlOrange cursor-pointer md:hover:fill-wwlOrange ${item.is_bookmarked ? 'fill-wwlOrange' : ''}`}/>
        </div>}

        <MealPlanMicroView show={show} setShow={setShow} recipe={item}
                           clickedOutside={clicked} smallClasses='rounded lg:hidden'
                           largeClasses='hidden lg:flex'
                           menuPosition={true} currentUser={currentUser} extraSmall/>
      </div>
    </td>

    <td className="hidden sm:table-cell whitespace-nowrap py-4 text-sm text-gray-500 sm:pr-4">
      {average_rating && <ShowRating avgRating={average_rating} backgroundColor={'bg-wwlTransparentYellow'}/>}
    </td>
    {prep_time &&
      <td className="whitespace-nowrap hidden sm:table-cell pr-3 py-4 xl:text-lg text-gray-500 font-chivo">
        {prep_time} <span className='hidden xl:inline'>minutes</span><span
        className='inline xl:hidden'>min</span>
      </td>}
    {cook_time &&
      <td className="whitespace-nowrap hidden sm:table-cell pr-3 py-4 xl:text-lg text-gray-500 font-chivo">
        {cook_time} <span className='hidden xl:inline'>minutes</span><span
        className='inline xl:hidden'>min</span>
      </td>}
    <td className='hidden sm:table-cell'>
      <div className='flex items-center justify-around gap-3'>
        {currentTab === 'My Favorites' ?
          <div className='h-8 block w-8 relative'>
            {loadingHeart &&
              <div className='bg-white absolute right-0 w-8 h-8'><Loader width='30px' height='30px'/>
              </div>}
            <HeartIcon onClick={(e) => handleFavorite(e)}
                       className={`h-7 w-7 xl:h-8 xl:w-8 text-wwlOrange mr-3 xl:mr-6 cursor-pointer hover:fill-wwlOrange ${item.is_favorite ? 'fill-wwlOrange' : ''}`}/>
          </div>
          :
          <div className='w-8 h-8 relative block'>
            {loading &&
              <div className='bg-white absolute right-0 w-8 h-8'><Loader width='30px' height='30px'/>
              </div>}
            <BookmarkIcon onClick={e => handleBookmark(e)}
                          className={`h-7 w-7 xl:h-8 xl:w-8 text-wwlOrange mr-3 xl:mr-6 cursor-pointer hover:fill-wwlOrange ${item.is_bookmarked ? 'fill-wwlOrange' : ''}`}/>
          </div>

        }

        <MealPlanMicroView show={show} setShow={setShow} recipe={item}
                           clickedOutside={clicked}
                           smallClasses='lg:hidden rounded-lg w-[28px] mb-1 flex justify-center items-center pr-1 pt-1'
                           largeClasses='hidden lg:flex'
                           menuPosition={true} currentUser={currentUser}/>
      </div>
    </td>
  </tr>);
};

export default RecipeRow;