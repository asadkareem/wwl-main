import React, {useEffect, useState} from 'react';
import MealPlanCard from "./components/MealPlanCard";
import MealPlanCardEmpty from "./components/MealPlanCardEmpty";
import {useSelector} from "react-redux";
import DragDrop from "./components/DragDrop/DragDrop";
import Loader from "../Loader";
import {mealTimes} from "../../utilis/generalUtilis";
import {hasMealPlaner} from "../../redux/user/userSlice";
import GoProModal from "../GoProModal";

const mealTimesIcon = ['🍳', '🥗', '🍝']
const MealPlanGrid = ({loading}) => {
  const hasMealPlanAccess = useSelector(hasMealPlaner);
  const {selectionInstanceDetails} = useSelector((state) => state.user);
  const days = Array.from(Array(6).keys());
  const [, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!hasMealPlanAccess) {
      setOpen(true)
    }

    function handleOutsideClick(event) {
      if (event.target.closest("#menu-parent") === null) {
        setClicked(false)
      } else {
        setClicked(true)
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick)
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className=''>
        <div
          className='hidden lg:grid gap-2 grid-cols-6 grid-rows-1 justify-items-center text-center mb-4 ml-8'>
          {days.map((day) => {
            return <h1 key={`Day ${day}`} className='font-chivo text-lg'>Day {day + 1}</h1>
          })}
        </div>
        <div
          className='flex justify-between mb-4 lg:hidden'>
          {
            mealTimes.map((mealTime, index) => {
              return <h1 key={mealTime} className={`font-chivo w-[32%] text-lg flex flex-col text-center sm:block `}>
                <span>{mealTimesIcon[index]}</span>{mealTime}</h1>
            })
          }
        </div>
        <div className='flex gap-2'>
          <div className='grid gap-2 grid-cols-1 grid-rows-3 justify-items-center mb-4 hidden lg:grid'>
            {
              mealTimes.map((mealTime, index) => {
                return (<div className='flex flex-col justify-center' key={mealTime}>
                  <h1 className='writing-mode-vertical font-chivo text-lg rotate-180'>  {mealTime}</h1>
                  <span className='-rotate-90 mr-4 mt-2'>{mealTimesIcon[index]}</span>
                </div>)
              })
            }
          </div>
          <div className='lg:hidden grid gap-2 grid-cols-1 grid-rows-6'>
            {days.map((day) => {
              return <h1 key={`Day ${day}`}
                         className='whitespace-nowrap font-chivo text-lg writing-mode-vertical rotate-180 text-center flex justify-center -translate-x-3'>Day {day + 1}</h1>
            })}
          </div>
          {loading ? <div className='w-full'><Loader/></div> :
            <div className='flex md:flex-row lg:flex-col gap-3 w-full'>
              {selectionInstanceDetails.map((mealPlans, rowIndex) => {
                return (
                  <div key={`${mealPlans._id}-${rowIndex}`}
                       className='flex justify-start lg:justify-around flex-wrap lg:flex-nowrap lg:gap-3 flex-col lg:flex-row w-[32%] lg:w-full'>
                    {mealPlans.meals.map((item, idx) => {
                      return (
                        <div className="w-full lg:w-[32%] mb-2" key={`${item._id}-${idx}`}>
                          {Object.keys(item).length > 2 ?
                            <MealPlanCard item={item} rowIndex={rowIndex}
                                          itemIndex={idx}/> :
                            <MealPlanCardEmpty rowIndex={rowIndex} itemIndex={idx} setSidebarOpen={setSidebarOpen}/>}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>}
          <DragDrop sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        </div>
      </div>
      <GoProModal open={open} setOpen={setOpen}/>
    </>
  );
};

export default MealPlanGrid;