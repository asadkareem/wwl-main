import React, {Fragment, useEffect, useState} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {PlusIcon} from "@heroicons/react/solid";
import Button from "../Button";
import AddMealPlanCard from "./components/AddMealPlanCard";
import {hasMealPlaner, selectSelectionDetails, updateClickedOutside} from "../../redux/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {mealTimes} from "../../utilis/generalUtilis";
import {useLocation} from "react-router-dom";
import GoProModal from "../GoProModal";
import {selectIsTouchScreen} from "../../redux/navigation/navigationSlice";

const MealPlanMicroView = ({
                             show,
                             setShow,
                             recipe,
                             clickedOutside,
                             menuPosition,
                             top,
                             smallClasses,
                             largeClasses,
                             currentUser,
                             handleNullUser,
                             extraSmall = false,
                             isModal = false
                           }) => {
  const location = useLocation().pathname;
  const isTouchScreen = useSelector(selectIsTouchScreen);
  const selectedRecipes = useSelector(selectSelectionDetails)
  const hasMealPlanPermission = useSelector(hasMealPlaner);
  const days = Array.from(Array(6).keys());
  const mealTimesIcon = ['🍳', '🥗', '🍝']
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    if (clickedOutside) {
      setShow(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedOutside])
  const handleClick = (e) => {
    if(!hasMealPlanPermission){
      setShowModal(true);
      return;
    }
    e.preventDefault()
    if (!currentUser) {
      handleNullUser();
      return
    }
    dispatch(updateClickedOutside(false))
    setShow(!show)
  }
  return (
    <>
      <Menu as="div" className="relative inline-block text-left menu-parent" onClick={(e) => handleClick(e)}>
        <Button btnText='Add to Meal Plan' smallButton={true} BtnIcon={PlusIcon}
                extraClasses={`rounded-lg border-2 border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite text-wwlOrange transition-colors duration-300 ${largeClasses} z-40 relative`}
                iconExtraClasses='hover:text-wwlWhite' onClick={(e) => handleClick(e)}/>

        {smallClasses && <div
          className={`border-2 border-wwlOrange ${extraSmall ? "h-5 w-6" : "h-7 w-8"} text-wwlOrange ${!isTouchScreen && 'hover:bg-wwlOrange hover:text-wwlWhite'} transition-colors cursor-pointer group ${smallClasses}`}
          onClick={(e) => handleClick(e)}>
          <PlusIcon
            className={`inline-block ${!isTouchScreen && 'group-hover:text-wwlWhite'} ${extraSmall ? "h-3 w-3 mb-2 ml-1" : "h-5 ml-1 mb-1 w-5 xl:h-8 xl:w-8"}  text-wwlOrange`}/>
        </div>}

        <Transition
          show={show}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform translate-y-1/2 sm:translate-y-0 sm:opacity-0 sm:scale-95"
          enterTo="transform translate-y-0 sm:translate-y-0 sm:opacity-100 sm:scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform translate-y-0 sm:translate-y-0 sm:opacity-100 sm:scale-100"
          leaveTo="transform translate-y-1/2 sm:translate-y-0 sm:opacity-0 sm:scale-95"
        >
          <Menu.Items
            className={`
  fixed
  ${top ? 'top-0' : 'bottom-0'}
  left-1/2
  -translate-x-1/2
  ${isModal ? 'bottom-0 right-0 left-auto -translate-x-0' : ''}
  ${menuPosition ? 'sm:-translate-x-full sm:absolute sm:origin-top-right sm:-top-[150px]' : 'sm:translate-x-0 sm:absolute sm:origin-top-right'} 
  shadow-wwlDragDropShadow 
  sm:topShadow 
  z-50 
  mt-2 
  w-full 
  h-72 
  rounded-lg 
  bg-wwlWhite 
  ring-1 
  ring-black 
  ring-opacity-5 
  divide-y 
  divide-gray-100 
  focus:outline-none 
  overflow-y-scroll 
  scrollbar 
  scrollbar-thin 
  scrollbar-thumb-wwlOrange 
  scrollbar-track-wwlGray200 
  sm:w-80 
  ${location === '/saved-recipes' ? 'left-1/2' : 'sm:-left-1/2'}
`}>
            <div className="p-4 rounded-lg">
              <Menu.Item>
                {({active}) => (
                  <div>
                    <div className='grid gap-2 grid-cols-3 grid-rows-1 justify-items-center mb-2 ml-3'>
                      {
                        mealTimes.map((mealTime, index) => {
                          return <h1 key={mealTime}
                                     className={`font-chivo text-sm flex flex-col text-center sm:block `}>
                            <span>{mealTimesIcon[index]}</span>{mealTime}</h1>
                        })
                      }
                    </div>
                    <div className='flex'>
                      <div className='grid gap-2 grid-cols-1 grid-rows-6'>
                        {days.map((day) => {
                          return <h1 key={`Day ${day}`}
                                     className='whitespace-nowrap font-chivo text-base writing-mode-vertical rotate-180 text-center flex justify-center'>Day {day + 1}</h1>
                        })}
                      </div>
                      <div className='flex justify-between mb-2 w-full'>
                        {selectedRecipes?.map((mealPlan, rowIndex) => {
                          return <div className='flex flex-col grow items-center'>
                            {mealPlan?.meals.map((mealPlanItem, itemIndex) => {
                                return <AddMealPlanCard key={itemIndex} rowIndex={rowIndex}
                                                        itemIndex={itemIndex} item={mealPlanItem}
                                                        recipe={recipe} setShow={setShow}/>
                              }
                            )}
                          </div>
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <GoProModal open={showModal} setOpen={setShowModal}/>
    </>
  );
};

export default MealPlanMicroView