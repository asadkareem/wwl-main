import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import Button from "../../../components/Button";
import Lottie from 'react-lottie-player';
import saveAnimation from '../assets/save-animation.json'
import {createMealPlan} from "../../../redux/mealPlan/mealPlanThunk";
import {toast} from "react-hot-toast";
import {deleteSelectionData} from "../../../redux/user/userSlice";
import {mealTimes} from "../../../utilis/generalUtilis";
import {useNavigate} from "react-router-dom";
import Loader from "../../../components/Loader";
import {selectCurrentMealPlan} from "../../../redux/mealPlan/mealPlanSlice";

export default function SaveMealPlanModal({open, setOpen, mealPlanSaved, setMealPlanSaved, subHeading}) {
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch();
  const textInput = useRef(null);
  const {selectionInstanceDetails} = useSelector((state) => state.user)
  const currentMealPlan = useSelector(selectCurrentMealPlan)

  const handleSubmit = async () => {
    const date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: '2-digit'}).format(new Date())
    const body = {
      title: textInput.current.value || `${date} Meal Plan`,
      owner: currentUser?._id,
      plan_data: selectionInstanceDetails,
    };

    try {
     setLoader(true)
      await dispatch(createMealPlan(body))
      setMealPlanSaved(true)
      dispatch(deleteSelectionData(mealTimes))
      setLoader(false)
    } catch (e) {
      toast.error('Something went wrong, Please try again!')
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setOpen}>
        <div
          className="flex items-end justify-center  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-wwlWhite rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle  pb-14 px-16 max-w-3xl">
              {loader ? <div className='pt-14'><Loader/></div>: <><div>
                {/*<div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">*/}
                {/*  <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />*/}
                {/*</div>*/}
                {!mealPlanSaved && <div className="mt-3  sm:mt-5">
                  <Dialog.Title as="h3" className="text-3xl font-chivo text-wwlBlack mt-8">
                    Save Meal Plan
                  </Dialog.Title>
                  {/*<div className="mt-2">*/}
                  {/*  <p className="text-lg font-chivo text-[#6941C6]">*/}
                  {/*    Select the meal plan you want to add [recipe name] to below, or create a new*/}
                  {/*    plan.*/}
                  {/*  </p>*/}
                  {/*</div>*/}
                  <div>
                    <label htmlFor="meal-plan-title" className='block mt-8'>Meal Plan Title</label>
                    <input type="text" id='meal-plan-title'
                           className='w-full mt-1.5 border-wwlGray300 rounded-lg focus:ring-0 placeholder:text-wwlGray500 font-inter text-wwlGray500'
                           placeholder='Ex. December 2022 Week 2' ref={textInput}
                    />
                  </div>
                </div>}
                {mealPlanSaved && <div className="mt-3  sm:mt-5">
                  <div className='flex justify-center'>
                    <Lottie
                      loop
                      animationData={saveAnimation}
                      play
                      style={{width: 150, height: 150}}
                    />
                  </div>
                  <Dialog.Title as="h3" className="text-3xl font-chivo text-wwlBlack text-center">
                    Saved
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm font-chivo text-wwlGray500">
                      You can find your new meal plan in Meal Planning > My Meal Plans.
                    </p>
                  </div>
                </div>}
              </div>
                <div className="mt-5 sm:mt-6">
                  {!mealPlanSaved && <Button btnText='Save' btnFilled={true}
                                             extraClasses='rounded-lg border border-transparent bg-wwlOrange text-wwlWhite hover:bg-wwlWhite hover:border-wwlOrange hover:text-wwlOrange min-w-full'
                                             onClick={handleSubmit}/>}
                  {mealPlanSaved && <Button btnText='See grocery list' extraClasses='rounded-lg mt-2 grow min-w-full px-5 border border-wwlOrange text-wwlOrange hover:text-wwlWhite hover:bg-wwlOrange' onClick={e=>navigate(`/shopping-list?mp=${currentMealPlan._id}&t=${currentMealPlan.title} (${currentUser.name} Version)`)}/>}
                  <Button btnText={`${mealPlanSaved ? 'Close' : 'Cancel'}`}
                          extraClasses='rounded-lg mt-2 grow min-w-full px-5 border border-wwlOrange text-wwlOrange hover:text-wwlWhite hover:bg-wwlOrange'
                          onClick={() => {
                            setOpen(false);
                            // if(subHeading !== 'Unsaved Meal Plan'){
                            //   navigate(`/shopping-list?mp=${currentMealPlan._id}&t=${currentMealPlan.title} (${currentUser.name} Version)`)
                            // }
                            // else if(mealPlanSaved){
                            //   navigate('/meal-planning/my-meal-plans')
                            // }
                            // else{
                            //   return null
                            // }
                          }}/>

                </div></>}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}