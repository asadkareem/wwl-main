import React, {useState} from 'react';
import {PlusIcon} from "@heroicons/react/solid";
import SadFaceImage from '../../../pages/CreateMealPlan/assets/sad-face.png'
import {useDispatch} from "react-redux";
import {removeMealPanRecipe, updateEmptyCardIndex, updateEmptyCardRecipe} from "../../../redux/user/userSlice";

const MealPlanCardEmpty = ({itemIndex, rowIndex, setSidebarOpen})  => {

  const [isOver, setIsOver] = useState(false);

  function handleDragOver(e) {
    if (e.dataTransfer.types[0] === "text/plain") {
      setIsOver(true);
      e.preventDefault();
    }
  }

  async function handleDrop(e) {
    const dataJSON = e.dataTransfer.getData("text/plain");
    const {item, rowIndex:rIndex, itemIndex:iIndex} = JSON.parse(dataJSON);
    await dispatch(removeMealPanRecipe({rowIndex:rIndex, itemIndex:iIndex}));
    await dispatch(updateEmptyCardIndex({itemIndex, rowIndex}));
    await dispatch(updateEmptyCardRecipe(item));
  }

  function handleDragLeave() {
    setIsOver(false);
  }
    const dispatch = useDispatch()
    return (
        <div
          style={{ backgroundColor: isOver ? "rgba(0,0,0,.1)" : "white" }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
            className='w-full bg-wwlWhite border rounded-xl overflow-hidden relative flex flex-col justify-between h-[190px] sm:h-[180px] md:h-[200px] lg:h-full'>
            <div className='h-[33%] sm:h-[36%] hidden sm:flex grow lg:hidden xl:flex relative'>
                <img src={SadFaceImage} alt="recipe"
                     className='h-full mx-auto pointer-events-none'/>
            </div>
            <div className='p-2'>
                <h1 className='font-sourcesanspro leading-5'>Empty</h1>
                <h3 className='font-hind mt-1 text-xs'>Click button below to add recipe.</h3>
            </div>
            <div className='p-2 w-full flex items-center justify-center'>
                <div
                    className='p-2 w-full flex  items-center justify-center border border-wwlOrange bg-wwlOrange text-white rounded-md hover:cursor-pointer hover:bg-wwlWhite hover:text-wwlOrange transition-all'
                    onClick={() => {
                        setSidebarOpen(true)
                        dispatch(updateEmptyCardIndex({itemIndex, rowIndex}))
                    }}>
                    <PlusIcon className='h-4'/>
                </div>
            </div>
        </div>
    );
};

export default MealPlanCardEmpty;