import React, {useEffect, useState} from 'react';
import SwitchButton from "../../../components/SwitchButton";
import ShowRating from "../../../components/ShowRating";
import Rating from "./components/Rating";
import Button from "../../../components/Button";
import NotesDrawer from "./NotesDrawer/NotesDrawer";
import {useDispatch, useSelector} from "react-redux";

import {
  currentUserBookmarks,
  currentUserFavorites,
  selectClickedOutside,
  selectUser
} from "../../../redux/user/userSlice";
import {BookmarkIcon, HeartIcon, ArrowsExpandIcon, PrinterIcon} from "@heroicons/react/outline";
import {addBookmarked, addFavorite, updateCurrentUserPreferences} from "../../../redux/user/userThunk";
import MealPlanMicroView from "../../../components/MealPlanMicroView/MealPlanMicroView";
import {toast} from "react-hot-toast";
import NavigationLink from "../../../components/NavigationLink";

const recipeCustomizationOptions = [
  {id: '1', name: "Omnivore", value: "Omnivore"},
  {id: '2', name: "Vegetarian", value: "Vegetarian"},
  {id: '3', name: "Vegan", value: "Vegan"},
  {id: '3', name: "Dairy Free", value: "Dairy Free"},
  {id: '4', name: "Gluten Free", value: "Gluten Free"}
]

const RecipeHeader = ({recipe, handleNullUser, currentUser, isModal = false, setPrint}) => {
  const userFavorites = useSelector(currentUserFavorites) || [];
  const userBookmarks = useSelector(currentUserBookmarks) || [];

  const {title, primary_image, average_rating, _id} = recipe;
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {primaryDiet, isGlutenFree, isDairyFree, unitPreference} = useSelector(selectUser);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const clicked = useSelector(selectClickedOutside)
  const [favorite, setFavorite] = useState(userFavorites?.some(recipe => recipe === _id))
  const [save, setSave] = useState(userBookmarks?.some(recipe => recipe === _id))

  const handleFavorite = (e) => {
    if (!currentUser) {
      handleNullUser()
      return
    }
    dispatch(addFavorite(_id))
    setFavorite(!favorite)
    if (favorite) {
      toast.success('Recipe removed from favorites')
    } else {
      toast.success('Recipe added to favorites')
    }
  }
  const handleLater = (e) => {
    if (!currentUser) {
      handleNullUser()
      return
    }
    dispatch(addBookmarked(_id))
    setSave(!save)
    if (save) {
      toast.success('Recipe removed from bookmarks')
    } else {
      toast.success('Recipe added to bookmarks')
    }
  }
//if title exist go ahead else set title value to ""
  const recipeSubtitle = (title ?? '').split('with') || [title ?? ''];

  useEffect(() => {
    if (currentUser) {
      dispatch(updateCurrentUserPreferences({
        unit_preference: unitPreference,
        primary_diet: primaryDiet,
        is_gluten_free: isGlutenFree,
        is_dairy_free: isDairyFree,
        userId: currentUser?._id
      }))
    }
    //eslint-disable-next-line
  }, [isDairyFree, isGlutenFree, primaryDiet])

  return (
    <div
      className={`lg:flex lg:justify-between ${isModal ? 'flex-col-reverse' : ''} lg:max-h-94 lg:border-b lg:border-b-wwlYellow lg:pb-10`}>
      <div className='lg:order-2 lg:flex-grow overflow-hidden flex items-center'>
        <img src={primary_image} alt="recipe" className="w-full"/>
      </div>
      {!isModal && <div className='lg:order-1 lg:mr-14 xl:mr-20'>
        <h1 className="font-chivo font-bold text-2xl lg:text-3xl mt-4 lg:mt-0">{recipeSubtitle[0]}</h1>
        {recipeSubtitle[1] && <h3 className="font-chivo text-lg">{recipeSubtitle[1]}</h3>}

        <div className='mt-10 flex items-center gap-2 lg:px-0'>
          <Button btnText='Favorite' BtnIcon={HeartIcon} smallButton={true} textClasses='hidden md:block'
                  extraClasses={`rounded-lg border-2 border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite transition-colors duration-300 ${favorite ? 'bg-wwlOrange text-wwlWhite' : 'text-wwlOrange'}`}
                  iconExtraClasses='hover:text-wwlWhite mr-0 md:mr-2' onClick={e => handleFavorite(e)
          }/>
          <Button btnText='Save for Later' BtnIcon={BookmarkIcon} smallButton={true}
                  textClasses='hidden md:block'
                  extraClasses={`rounded-lg border-2 border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite transition-colors duration-300 ${save ? 'bg-wwlOrange text-wwlWhite' : 'text-wwlOrange'}`}
                  iconExtraClasses='hover:text-wwlWhite mr-0 md:mr-2' onClick={() => {
            handleLater()
          }
          }/>
          <MealPlanMicroView show={show} setShow={setShow} recipe={recipe} extraSmall={false}
                             clickedOutside={clicked}
                             top={true}
                             smallClasses='rounded-lg min-w-[50px] h-10 flex items-center justify-center pr-1 pt-1 sm:hidden'
                             largeClasses='hidden sm:flex'
                             menuInCenter={true} handleNullUser={handleNullUser} currentUser={currentUser}/>
          <Button btnText='Print' smallButton={true} BtnIcon={PrinterIcon}
                  textClasses='hidden md:block'
                  extraClasses='rounded-lg border-2 border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite transition-colors duration-300 text-wwlOrange'
                  iconExtraClasses="hover:text-wwlWhite mr-0 md:mr-2" onClick={() => {
            setPrint(true);
          }
          }/>
        </div>
        <div className='flex items-center justify-between flex-wrap gap-y-4 mt-10'>
          <div className='flex items-center gap-6 sm:gap-10'>
            <Rating id={recipe._id} handleNullUser={handleNullUser}/>
            <div className=''><ShowRating avgRating={average_rating}/></div>
          </div>
          <div className='flex items-center mt-2   sm:mt-0 flex-wrap gap-y-4'>
            <Button btnText='Comments' smallButton={true}
                    extraClasses='hover:bg-wwlOrange hover:text-wwlWhite border border-wwlOrange text-wwlOrange rounded-xl focus:outline-none focus-visible:ring'
                    onClick={() => {
                      if (!currentUser) {
                        handleNullUser()
                        return
                      }
                      setSidebarOpen(true)
                    }}/>
          </div>

          <NotesDrawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        </div>
        <div className="mt-8 lg:mt-14">
          <h4 className="font-chivo font-normal text-xs lg:text-sm mb-2">Make it...</h4>
          <div className='flex flex-wrap gap-y-4 scrollbar-hide'>
            {recipeCustomizationOptions.map((option) => {
              return <SwitchButton currentUser={currentUser} handleNullUser={handleNullUser} key={option.name}
                                   customizedOption={option.name} userPreference={
                option.name !== 'Dairy Free' && option.name !== 'Gluten Free' ? (primaryDiet === option.name ? true : false) : (option.name === 'Dairy Free' ? isDairyFree : isGlutenFree)
              }/>
            })}
          </div>
        </div>
      </div>}
      {isModal && <div className='lg:flex lg:justify-between items-center gap-6'>
        <div className='flex flex-col gap-6 mt-6 lg:mt-12'>
          <h1 className="font-chivo font-bold text-2xl lg:text-3xl mt-4 lg:mt-0">{recipeSubtitle[0]}</h1>
          <h3 className="font-chivo text-lg group-hover:underline">{recipeSubtitle[1]}</h3>
          <NavigationLink url={`/recipe-detail/${recipe._id}`} linkText='See Full Recipe' LinkIcon={ArrowsExpandIcon}
                          smallButton={true} textClasses='hidden md:block'
                          extraClasses={`border-2 border-wwlOrange bg-wwlOrange hover:bg-wwlWhite text-wwlWhite hover:text-wwlOrange transition-colors duration-300 w-fit focus-visible:outline-0`}
                          iconExtraClasses='mr-3 w-5 h-5'
          />
        </div>
        <div className="mt-6 lg:mt-12">
          <h4 className="font-chivo font-normal text-xs lg:text-sm mb-2">Make it...</h4>
          <div className='flex flex-wrap gap-y-4 scrollbar-hide'>
            {recipeCustomizationOptions.map((option) => {
              return <SwitchButton currentUser={currentUser} handleNullUser={handleNullUser} key={option.name}
                                   customizedOption={option.name} userPreference={
                option.name !== 'Dairy Free' && option.name !== 'Gluten Free' ? primaryDiet === option.name ? true : false : option.name === 'Dairy Free' ? isDairyFree : isGlutenFree
              }/>
            })}
          </div>
        </div>
      </div>}
    </div>
  );
};

export default RecipeHeader;
