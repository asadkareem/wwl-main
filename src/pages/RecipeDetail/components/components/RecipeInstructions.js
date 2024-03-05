import React, {useState} from 'react';
import RecipeIngredients from "./RecipeIngredients";
import Tabs from "../../../../components/Tabs";
import Loader from "../../../../components/Loader";
import {PlusIcon, MinusIcon} from "@heroicons/react/solid";
import Button from "../../../../components/Button";
import {BookmarkIcon, HeartIcon} from "@heroicons/react/outline";
import MealPlanMicroView from "../../../../components/MealPlanMicroView/MealPlanMicroView";
import {useDispatch, useSelector} from "react-redux";
import {
  currentUserBookmarks,
  currentUserFavorites,
  selectClickedOutside,
  selectCurrentUser
} from "../../../../redux/user/userSlice";
import {addBookmarked, addFavorite} from "../../../../redux/user/userThunk";
import {toast} from "react-hot-toast";
import {useMediaQuery} from "react-responsive";
import {selectIsTouchScreen} from "../../../../redux/navigation/navigationSlice";

export default function RecipeInstructions({servingsCount, setServingsCount,
                                             prepTime,
                                             cookTime,
                                             servings,
                                             ingredients,
                                             instructions,
                                             dairyFree,
                                             glutenFree,
                                             loadingTab,
                                             _id,
                                             isModal = false
                                           }) {

  const dispatch = useDispatch();
  const isTouchScreen = useSelector(selectIsTouchScreen);

  const currentUser = useSelector(selectCurrentUser)
  const userFavorites = useSelector(currentUserFavorites) || [];
  const userBookmarks = useSelector(currentUserBookmarks) || [];
  const clicked = useSelector(selectClickedOutside)
  const {currentRecipe} = useSelector(state => state.recipe);

  const [show, setShow] = useState(false);
  const [favorite, setFavorite] = useState(userFavorites?.some(recipe => recipe === _id))
  const [save, setSave] = useState(userBookmarks?.some(recipe => recipe === _id))

  const extraSmallView = useMediaQuery({query: '(max-width: 440px)'})
  const handleFavorite = (e) => {
    dispatch(addFavorite(_id))
    setFavorite(!favorite)
    if (favorite) {
      toast.success('Recipe removed from favorites')
    } else {
      toast.success('Recipe added to favorites')
    }
  }

  const handleLater = (e) => {
    dispatch(addBookmarked(_id))
    setSave(!save)
    if (save) {
      toast.success('Recipe removed from bookmarks')
    } else {
      toast.success('Recipe added to bookmarks')
    }
  }

  const [tabs, setTabs] = useState([
    {name: 'Ingredients', current: true},
    {name: 'Directions', current: false}
  ]);

  const [currentTab, setCurrentTab] = useState('Ingredients');

  function handleServings(type) {
    if (type === 'increase') {
      if (servingsCount < 12) {
        setServingsCount(prev => prev + 1);
      }
    } else {
      if (servingsCount > 1) {
        setServingsCount(prev => prev - 1);
      }
    }
  }
  return (
    <div>
      <div className='mt-8 border-2 border-wwlWhiteDim p-1 rounded-lg lg:hidden'>
        <div className="block">
          <div className={`font-chivo flex justify-between max-w-lg bg-wwlWhite px-4 py-6 mb-4 flex-wrap gap-6 items-center ${extraSmallView && 'justify-around'}`}>
            <div className=''>
              <h6 className='text-xs mb-2'>Prep Time</h6>
              <h4 className='text-base whitespace-nowrap sm:whitespace-normal'>{prepTime}<br className='hidden sm:block'/> mins</h4>
            </div>
            <div className=''>
              <h6 className='text-xs mb-2'>Cook Time</h6>
              <h4 className='text-base'>{cookTime}<br className='hidden sm:block'/> mins</h4>
            </div>
            <div className={`flex flex-col items-center`}>
              <h6 className='text-xs mb-2'>Servings</h6>
              <div className='flex items-center gap-2'>
                <Button BtnIcon={MinusIcon} smallButton={true}
                        extraClasses='rounded-lg bg-wwlOrange text-white h-full px-2 py-3'
                        iconExtraClasses='hover:text-wwlWhite mr-0 w-4 h-4' onClick={() => {
                  handleServings('decrease')
                }
                }/>
                <div
                  className='flex text-base border shadow-[0px_1px_2px_rgba(16,24,40,0.05)] py-2 px-4 rounded-lg max-w-[45px] mx-1'>{servingsCount}</div>
                <Button BtnIcon={PlusIcon} smallButton={true}
                        extraClasses='rounded-lg bg-wwlOrange text-white h-full px-2 py-3'
                        iconExtraClasses='hover:text-wwlWhite mr-0 w-4 h-4' onClick={() => {
                  handleServings('increase')
                }
                }/>
              </div>
            </div>
          </div>

          <nav className="flex justify-between print-hide" aria-label="RecipeInstructions">
            <Tabs tabs={tabs} setCurrentTab={setCurrentTab} setTabs={setTabs} />
          </nav>
        </div>
        <div className="mt-11 px-3">
          <RecipeIngredients
            servings={servings}
            servingsCount={servingsCount}
            dataToRender={
              currentTab === "Ingredients"
                ? ingredients && ingredients
                : instructions && instructions
            }
            title={currentTab}
            dairyFree={dairyFree}
            glutenFree={glutenFree}
          />
        </div>
      </div>
      <div
        className={`hidden lg:block lg:mt-10 lg:flex gap-4 ${isModal ? '' : 'lg:pb-10 lg:border-b lg:border-b-wwlYellow'}`}>
        <div className='lg:w-1/3'>
          <div className='font-chivo flex justify-center pr-5 mb-10 gap-4 flex-wrap'>
            <div className='grow'>
              <h6 className='text-xs mb-2'>Prep Time</h6>
              <h4 className='text-base'>{prepTime} <br/> mins</h4>
            </div>
            <div>
              <h6 className='text-xs mb-2'>Cook Time</h6>
              <h4 className='text-base whitespace-nowrap sm:whitespace-normal'>{cookTime} <br/> mins</h4>
            </div>
            <div className='flex flex-col items-center grow'>
              <h6 className='text-xs mb-2'>Servings</h6>
              <div className='flex items-center gap-2'>
                <Button BtnIcon={MinusIcon} smallButton={true}
                        extraClasses='rounded-lg bg-wwlOrange text-white h-full px-2 py-3'
                        iconExtraClasses='hover:text-wwlWhite mr-0 w-4 h-4' onClick={() => {
                  handleServings('decrease')
                }
                }/>
                <div
                  className='flex text-base border shadow-[0px_1px_2px_rgba(16,24,40,0.05)] py-2 px-4 rounded-lg max-w-[45px]'>{servingsCount}</div>
                <Button BtnIcon={PlusIcon} smallButton={true}
                        extraClasses='rounded-lg bg-wwlOrange text-white h-full px-2 py-3'
                        iconExtraClasses='hover:text-wwlWhite mr-0 w-4 h-4' onClick={() => {
                  handleServings('increase')
                }
                }/>
              </div>
            </div>
          </div>
          {loadingTab ? <Loader top={true}/> :
            <RecipeIngredients servingsCount={servingsCount}  servings={servings} dataToRender={ingredients && ingredients}
                               title='Ingredients' dairyFree={dairyFree} glutenFree={glutenFree}/>}
        </div>
        <div className='lg:w-2/3'>
          {loadingTab ? <Loader/> :
            <RecipeIngredients dataToRender={instructions && instructions} title='Directions' dairyFree={dairyFree}
                               glutenFree={glutenFree}/>}
        </div>
      </div>
      {isModal && <div className='flex items-center justify-center md:justify-end gap-2 lg:px-0 py-6'>
        <Button btnText='Favorite' BtnIcon={HeartIcon} smallButton={true} textClasses='hidden md:block'
                extraClasses={`rounded-lg border-2 border-wwlOrange px-1 py-0.5 sm:px-4 sm:py-2 sm:rounded-lg ${!isTouchScreen && 'hover:bg-wwlOrange hover:text-wwlWhite'} transition-colors duration-300 ${favorite ? 'bg-wwlOrange text-wwlWhite' : 'text-wwlOrange'}`}
                iconExtraClasses={`${!isTouchScreen && 'hover:text-wwlWhite'} mr-0 md:mr-2`} onClick={e => handleFavorite(e)
        }/>
        <Button btnText='Save for Later' BtnIcon={BookmarkIcon} smallButton={true}
                textClasses='hidden md:block'
                extraClasses={`rounded-lg border-2 border-wwlOrange px-1 py-0.5 sm:px-4 sm:py-2 sm:rounded-lg ${!isTouchScreen && 'hover:bg-wwlOrange hover:text-wwlWhite'} transition-colors duration-300 ${save ? 'bg-wwlOrange text-wwlWhite' : 'text-wwlOrange'}`}
                iconExtraClasses={`${!isTouchScreen && 'hover:text-wwlWhite'} mr-0 md:mr-2`} onClick={() => {
          handleLater()
        }
        }/>
        <MealPlanMicroView show={show} setShow={setShow} recipe={currentRecipe}
                           clickedOutside={clicked} isModal={true} smallClasses={`rounded-lg min-w-[50px] h-10 flex items-center justify-center pr-1 pt-1 sm:hidden`} largeClasses='hidden sm:flex'
                           menuInCenter={true} currentUser={currentUser}/>
      </div>}
    </div>
  )
}