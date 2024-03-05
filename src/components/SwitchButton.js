import {useDispatch, useSelector} from 'react-redux';
import {
  selectUser,
  updateIsDairyFree,
  updateIsGlutenFree,
  updatePrimaryDiet
} from '../redux/user/userSlice';

import {Switch} from '@headlessui/react'
import {useEffect, useState} from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SwitchButton({
                                       customizedOption,
                                       isSmall = false,
                                       userPreference,
                                       changeHandler,
                                       updateReduxState = true,
                                       veganOption,
                                       handleNullUser,
                                       currentUser
                                     }) {
// REDUX
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const {primaryDiet} = useSelector(selectUser);

  useEffect(() => {
    setEnabled(customizedOption.selected);
  }, [customizedOption.selected]);
  const handleChange = (e, customizedOption) => {
    if (!currentUser && handleNullUser) {
      handleNullUser()
      return
    }
    switch (customizedOption) {
      case 'Gluten Free':
        dispatch(updateIsGlutenFree(e));
        break;
      case 'Dairy Free':
        dispatch(updateIsDairyFree(e));
        break;
      default:
        if (updateReduxState) {
          if (customizedOption === 'Vegan') {
            dispatch(updatePrimaryDiet(customizedOption))
            dispatch(updateIsDairyFree(true));
          } else if (customizedOption === 'Vegetarian') {
            dispatch(updatePrimaryDiet(customizedOption))
            dispatch(updateIsDairyFree(false));
          } else {
            dispatch(updatePrimaryDiet(customizedOption))
          }
        }
    }
  }

  if (userPreference !== undefined) {
    return (<div className={`flex flex-${isSmall ? 'row' : 'col'} items-center max-w-fit mr-6`}>
      <Switch
        checked={userPreference}
        onChange={(e) => {
          handleChange(e, customizedOption)
        }}
        disabled={(primaryDiet === 'Vegan' || primaryDiet === 'Vegetarian') && customizedOption === 'Dairy Free'}

        className={classNames(
          userPreference ? 'bg-wwlOrange' : 'bg-wwlTransparentOrange',
          `relative inline-flex flex-shrink-0 ${isSmall ? 'h-7 w-14' : 'h-9 w-16'} border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0`
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            userPreference ? 'translate-x-7' : 'translate-x-0',
            `pointer-events-none inline-block ${isSmall ? 'h-6 w-6' : 'h-8 w-8'} rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`
          )}
        />
      </Switch>
      <p
        className={`whitespace-nowrap ${isSmall ? 'text-sm ml-2.5 text-inter' : 'mt-2 text-xs font-chivo'}`}>{customizedOption}</p>
    </div>)
  } else {
    return (
      <div className={`flex flex-${isSmall ? 'row' : 'col'} items-center max-w-fit mr-6`}>
        <Switch
          checked={enabled}
          onChange={(e) => {
            handleChange(setEnabled(e))
            changeHandler(customizedOption.id)
          }}
          disabled={customizedOption.name === 'Dairy Free' && veganOption ? true : false}
          className={classNames(
            enabled ? 'bg-wwlOrange' : 'bg-wwlTransparentOrange',
            `relative inline-flex flex-shrink-0 ${isSmall ? 'h-7 w-14' : 'h-9 w-16'} border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0`
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-7' : 'translate-x-0',
              `pointer-events-none inline-block ${isSmall ? 'h-6 w-6' : 'h-8 w-8'} rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`
            )}
          />
        </Switch>
        <p
          className={`whitespace-nowrap ${isSmall ? 'text-sm ml-2.5 font-chivo' : 'mt-2 text-xs font-chivo'}`}>{userPreference ? customizedOption :
          <span className='flex items-center'>
          <img src={customizedOption.icon} alt={customizedOption.name} className="w-5 h-5 mr-2"/>
            {customizedOption.name}
        </span>}</p>
      </div>
    )
  }
}