import React from 'react';
import {PlusIcon, MinusIcon, ChevronDoubleRightIcon} from "@heroicons/react/solid";
import Button from "../../Button";
import {addSelectionDetails, selectSelectionDetails} from "../../../redux/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectIsTouchScreen} from "../../../redux/navigation/navigationSlice";
import {isEmptyObject} from "../../../utilis/generalUtilis";
import {useMediaQuery} from "react-responsive";

const ServingCount = ({count, increment, decrement, recipe, rowIndex, itemIndex, setShow, setCount}) => {
  const grid = useSelector(selectSelectionDetails)
  const isTouchScreen = useSelector(selectIsTouchScreen)
  const dispatch = useDispatch()

  const isSmallScreen = useMediaQuery({query: '(max-width: 1020px)'});
  const handleExpandAcross = (e) => {
    e.preventDefault();
    if (count === 1) return;
    let skipped = 0;
    for (let i = 0; i < count - 1; i++) {
      let newIndex = itemIndex + (i + 1) + skipped;
      while (newIndex < 6 && !isEmptyObject(grid[rowIndex].meals[newIndex])) {
        skipped++;
        newIndex++;
      }
      if (newIndex < 6) {
        dispatch(addSelectionDetails({ rowIndex, itemIndex: newIndex, recipe }));
      }
    }
    setShow(false);
    setCount(1)
  };


  return (
    <div className='flex flex-col items-center py-3'>
      <div className='flex justify-center items-center'>
        <div className='bg-wwlOrange p-1 sm:p-1.5 cursor-pointer rounded' onClick={() => {
          decrement()
        }}>
          <MinusIcon className='h-4 w-4 sm:h-5 sm:w-5 text-wwlWhite'/>
        </div>
        <span className='mx-5 text-xl font-chivo text-wwlBlack'>{count}</span>

        <div className='bg-wwlOrange p-1 sm:p-1.5 cursor-pointer rounded' onClick={() => {
          increment()
        }}>
          <PlusIcon className='h-4 w-4 sm:h-5 sm:w-5 text-wwlWhite'/>
        </div>
      </div>
      <Button btnText={`${isSmallScreen ? 'Expand Down' : 'Expand Across'}`} smallButton={true} BtnIcon={ChevronDoubleRightIcon}
              extraClasses={`rounded-lg border border-wwlOrange ${!isTouchScreen && 'hover:bg-wwlOrange hover:text-wwlWhite'} transition-colors duration-300 mt-5 py-1 px-2 text-xs sm:py-2 sm:px-4 sm:text-sm text-wwlOrange`}
              iconExtraClasses='hover:text-wwlWhite mr-0 ml-1 sm:ml-2 w-4 h-4' onClick={(e) => handleExpandAcross(e)}
              iconPositionRight={false} isTouchScreen={isTouchScreen}/>
    </div>
  );
};

export default ServingCount;