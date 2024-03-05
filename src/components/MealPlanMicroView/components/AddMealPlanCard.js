import React, { useState} from 'react';
import {PlusIcon} from "@heroicons/react/solid";
import {useDispatch} from "react-redux";
import {updateMicroViewRecipe} from "../../../redux/user/userSlice";
import {toast} from "react-hot-toast";
import {Link} from "react-router-dom";
import {isEmptyObject} from "../../../utilis/generalUtilis";

const AddMealPlanCard = ({rowIndex, itemIndex, recipe, item, setShow}) => {
  const dispatch = useDispatch()
  const [primaryImage, setPrimaryImage] = useState('')

  const addImage = (e, recipe) => {
    e.preventDefault();
    const mealPlanRecipeData = {
      title: recipe?.title,
      primaryImage: recipe?.primary_image,
      id: recipe?._id,
      cookTime: recipe?.cook_time,
      details: {
        collapsed: 1,
        diet: "Omnivore",
        isDairyFree: false,
        isGlutenFree: false
      },
      servings: recipe?.servings,
      diet: "Omnivore",
      isDairyFree: false,
      isGlutenFree: false
    }
    dispatch(updateMicroViewRecipe({rowIndex, itemIndex, mealPlanRecipeData}))
    setPrimaryImage(recipe.primary_image)
    setShow(false)

    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } px-3 py-2 w-fit bg-red-500 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex border-gray-200 justify-around items-center">
          <p className="whitespace-nowrap text-white mr-12 font-chivo">Saved to Meal Plan!</p>
          <Link to={'/meal-planning/meal-planner'}
                className="font-chivo w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm font-medium text-white hover:text-indigo-500 focus:outline-none mr-2"
          >
            Open Planner
          </Link>
        </div>
      </div>
    ), {duration: 1000})
  }

  return (
    <div
      className={`${item ? 'bg-transparent' : 'bg-wwlGrayNormal'}  transition-colors duration-300 border-2 border-transparent w-20 h-20 rounded-lg flex items-center justify-center cursor-pointer group hover:bg-transparent hover:border-wwlOrange`}
      onClick={(e) => {
        addImage(e, recipe)
      }}>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        {(!primaryImage && isEmptyObject(item)) && <PlusIcon className='h-6 w-6 mb-1'/>}
        {(primaryImage || Object.keys(item).length > 3) && <img src={item.primaryImage || primaryImage} className='object-cover rounded-lg' alt={"primary"}/>}
      </div>
    </div>
  );
};

export default AddMealPlanCard;