import React, {useState} from 'react';
import NavigationLink from "../NavigationLink";
import {ArrowLeftIcon, ShoppingCartIcon} from "@heroicons/react/outline";
import MealPlanGrid from "../MealPlanGrid/MealPlanGrid";
import Button from "../Button";
import ShoppingListModal from "../../pages/ShoppingList/components/ShoppingListModal";
import {useLocation, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {hasShoppingList, selectCurrentUser} from "../../redux/user/userSlice";
import GoProModal from "../GoProModal";
import {selectLoading} from "../../redux/loader/loaderSlice";
import MealPlanGridUneditable from "../MealPlanGridUneditable/MealPlanGridUneditable";

const MealPlanPageLayout = ({primaryHeading, subHeading, children, handleModalOpening}) => {
  const loading = useSelector(selectLoading);
  const {name} = useSelector(selectCurrentUser)
  const hasShoppingListPermission = useSelector(hasShoppingList);
  const [params] = useSearchParams();
  const id = params.get("mp")
  const subTitle = params.get('t')
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation().pathname

  function handleModal() {
    if (subHeading === 'Unsaved Meal Plan') {
      setOpen(true)
    } else {
      setOpenModal(true)
    }
  }

  return (<div className='mx-0 lg:mx-3 mt-10 '>
    <NavigationLink url={location.includes('this-weeks-meal-plan') ? '/home' : '/meal-planning'}
                    LinkIcon={ArrowLeftIcon}
                    linkText={!location.includes('this-weeks-meal-plan') ? 'Back to Meal Planning' : 'Back to Home'}
                    extraClasses='bg-wwlWhite text-wwlOrange hover:border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite px-4 border border-wwlOrange ml-8'/>
    <div className='rounded-2xl mt-16 bg-wwlWhite py-8 p-6'>
      {!location.includes('this-weeks-meal-plan') &&
        <div className='px-5  mb-10 flex lg:items-center justify-between items-start flex-col lg:flex-row'>
          <div>
            <h1 className='font-chivo text-4xl text-wwlBlack font-bold mb-2'>{primaryHeading}</h1>
            <p className='font-chivo text-wwlGray600'>✏️ {subHeading}</p>
          </div>
          <div className='lg:ml-10 mt-6 mb-6 lg:my-0 w-full sm:w-fit'>
            <div className={'flex items-start mt-5 flex-wrap justify-center sm:flex-nowrap sm:justify-start gap-2'}>
              {children}
              {subHeading === 'Unsaved Meal Plan' || !hasShoppingListPermission ?
                <Button BtnIcon={ShoppingCartIcon} btnText='Get the Shopping List'
                        extraClasses='bg-wwlGreen text-wwlDarkBlue border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen rounded-lg text-sm border sm:mt-0 max-w-full'
                        iconExtraClasses='h-4 inline-block mr-1'
                        onClick={() => handleModal()}/>

                :
                (<NavigationLink disabled={loading}
                                 url={`/shopping-list?mp=${id}&t=${subTitle} (${name} Version)`}
                                 LinkIcon={ShoppingCartIcon}
                                 linkText='Get the Shopping List'
                                 extraClasses='bg-wwlGreen text-wwlDarkBlue border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen px-6 block w-full text-center'/>)}
            </div>
            <ShoppingListModal setOpen={setOpen} open={open} handleModalOpening={handleModalOpening}/>
            <GoProModal open={openModal} setOpen={setOpenModal}/>
          </div>
        </div>
      }
      {
        !location.includes('this-weeks-meal-plan') ? <MealPlanGrid loading={loading}/> :
          <MealPlanGridUneditable loading={loading}/>
      }

    </div>
  </div>)
    ;
};

export default MealPlanPageLayout;