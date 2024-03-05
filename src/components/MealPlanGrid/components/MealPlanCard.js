import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import NavigationLink from '../../NavigationLink';
import ToolTip from '../../ToolTip';
import DropDownMenu from '../../DropDownMenu/DropDownMenu';
import MeatIcon from '../../../assets/icons/omnivore-icon.png';
import VegetarianIcon from '../../../assets/icons/vegetarian-icon.png';
import VeganIcon from '../../../assets/icons/vegan-icon.png';
import DairyFreeIcon from '../../../assets/icons/lactose-icon.png';
import GlutenFreeIcon from '../../../assets/icons/gluten-icon.png';
import GlutenFreeWhiteIcon from '../assets/gluten-icon-white.png';
import DairyFreeWhiteIcon from '../assets/lactose-icon-white.png';
import { XIcon } from '@heroicons/react/outline';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import {
  removeMealPanRecipe,
  selectPrimaryDiet,
  updateRecipeCardOptions,
  updateServingsCount,
  selectCurrentUser,
} from '../../../redux/user/userSlice';

import { useOnClickOutside } from '../../../utilis/customHooks';
import { selectIsTouchScreen } from '../../../redux/navigation/navigationSlice';
import {useSearchParams} from "react-router-dom";

const lineBreakStyles = {
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
};
// eslint-disable-next-line react-hooks/rules-of-hooks
const MealPlanCard = ({ item, clickedOutside, rowIndex, itemIndex }) => {
  const user = useSelector(selectCurrentUser);
  const [searchParams] = useSearchParams();
  const [isDragging, setIsDragging] = useState(false);
  const isTouchScreen = useSelector(selectIsTouchScreen);
  function handleDragStart(e) {
    setIsDragging(true);
    const data = JSON.stringify({ item, rowIndex, itemIndex });
    e.dataTransfer.setData('text/plain', data);
  }

  function handleDragEnd(e) {
    setIsDragging(false);
    e.dataTransfer.clearData();
  }

  const [showDietTypeMenu, setShowDietTypeMenu] = useState(false);
  const [showServingCountMenu, setShowServingCountMenu] = useState(false);

  const [options, setOptions] = useState([
    {
      id: 1,
      name: 'preference',
      value: 'Omnivore',
      selected: searchParams.get('mp') ? item.diet === "Omnivore" : user.primary_diet === 'Omnivore',
      icon: MeatIcon,
    },
    {
      id: 2,
      name: 'preference',
      value: 'Vegetarian',
      selected: searchParams.get('mp') ? item.diet === 'Vegetarian' : user.primary_diet === 'Vegetarian',
      icon: VegetarianIcon,
    },
    {
      id: 3,
      name: 'preference',
      value: 'Vegan',
      selected: searchParams.get('mp') ? item.diet === 'Vegan' : user.primary_diet === 'Vegan',
      icon: VeganIcon,
    },
    {
      id: 4,
      name: 'Dairy Free',
      value: 'Dairy Free',
      selected: searchParams.get('mp') ? item.isDairyFree : user.is_dairy_free || false,
      icon: DairyFreeIcon,
    },
    {
      id: 5,
      name: 'Gluten Free',
      value: 'Gluten Free',
      selected: searchParams.get('mp') ? item.isGlutenFree : user.is_gluten_free || false,
      icon: GlutenFreeIcon,
    },
  ]);

  const primaryDiet = useSelector(selectPrimaryDiet);

  const [primaryIcon, setPrimaryIcon] = useState(null);
  const dispatch = useDispatch();

  const [count, setCount] = useState(item.servings || 1);

  useEffect(() => {
    dispatch(updateServingsCount({ rowIndex, itemIndex, servings: count }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useEffect(() => {
    if (!clickedOutside) {
      setShowDietTypeMenu(false);
      setShowServingCountMenu(false);
    }
  }, [clickedOutside]);

  useEffect(() => {
    if (showDietTypeMenu) {
      setShowServingCountMenu(false);
    }
  }, [showDietTypeMenu, showServingCountMenu]);

  useEffect(() => {
    const noOptionSelected = options.every((option) => {
      if (option.id <= 3) {
        return !option.selected;
      } else {
        return true;
      }
    });
    if (noOptionSelected) {
      const icon = options.find((option) => option.value === primaryDiet);
      setPrimaryIcon(icon.icon);
    } else {
      // eslint-disable-next-line array-callback-return
      const icon = options.find((option, index) => {
        if (index < 3) {
          return option.selected;
        }
      });
      setPrimaryIcon(icon.icon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  const increment = () => {
    const maxCount = 12;
    if (count < maxCount) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleChange = (id) => {
    const selectedOptionId = Number(id) || id.id;
    const newOptions = options.map((option, index) => {
      if (index < 3) {
        if (selectedOptionId <= 3) {
          option.selected = false;
        }
      }
      if (option.id === selectedOptionId) {
        option.selected = !option.selected;
      }
      return option;
    });
    if (newOptions[2].selected || selectedOptionId === 4) {
      newOptions[3].selected =
        selectedOptionId === 4 ? newOptions[3].selected : true;
    } else if (selectedOptionId !== 5) {
      newOptions[3].selected = false;
    }
    setOptions(newOptions);
    dispatch(
      updateRecipeCardOptions({
        rowIndex,
        itemIndex,
        options: newOptions.filter((item) => item.selected || item.id > 3)
      })
    );
  };

  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setShowDietTypeMenu(false);
    setShowServingCountMenu(false);
  });

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: isDragging ? 'rgba(0,0,0,.1)' : 'white',
      }}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`w-full bg-wwlWhite border rounded-xl relative flex flex-col justify-between ${
        !isTouchScreen && 'parent'
      } h-[190px] sm:h-[180px] md:h-[200px] lg:h-full cursor-pointer`}
    >
      <div className="h-[42%] sm:h-[50%] relative">
        <div className="w-full h-full bg-wwlGray400 flex justify-center items-center rounded-t-xl overflow-hidden">
          <img
            src={item?.primaryImage}
            alt="recipe"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
        <div className="absolute right-1 cursor-pointer top-1 z-30">
          <ToolTip content="Open Recipe" direction="bottom">
            <NavigationLink
              url={`/recipe-detail/${item.id || item._id}`}
              LinkIcon={ExternalLinkIcon}
              target={'_blank'}
              extraClasses="border-0 text-wwlWhite px-0 py-0"
              iconExtraClasses="mr-0 w-5 h-5"
            />
          </ToolTip>
        </div>
        <div
          className={`absolute ${
            isTouchScreen ? 'opacity-1' : 'opacity-0'
          } top-0 left-1/2 transform -translate-x-1/2 cursor-pointer z-30 w-5 h-5 ease-in-out duration-300 bg-wwlOrange child flex items-center justify-center rounded`}
          onClick={(e) =>
            dispatch(removeMealPanRecipe({ rowIndex, itemIndex }))
          }
        >
          <XIcon className="w-4 h-4 text-white" />
        </div>
        {options[3].selected && (
          <div className="absolute left-1 top-1 sm:left-1 sm:top-1.5 w-5 h-5 p-1 cursor-pointer top-0 z-30 bg-wwlOrange rounded-full">
            <img
              src={DairyFreeWhiteIcon}
              alt="gluten free"
              className="pointer-events-none"
            />
          </div>
        )}
        {options[4].selected && (
          <div className="absolute left-1 top-7 sm:left-1 sm:top-7 w-5 h-5 p-1 cursor-pointer top-0 z-30 bg-wwlOrange rounded-full">
            <img
              src={GlutenFreeWhiteIcon}
              alt="gluten free"
              className="pointer-events-none"
            />
          </div>
        )}
        <div
          className={`absolute left-2 -bottom-5 ${
            showDietTypeMenu ? 'z-50' : 'z-30'
          } `}
        >
          <DropDownMenu
            otherProps={{ title: '', PrimaryIcon: primaryIcon }}
            clickedOutside={clickedOutside}
            show={showDietTypeMenu}
            rowIndex={rowIndex}
            setShow={setShowDietTypeMenu}
            options={options}
            changeHandler={handleChange}
          />
        </div>
      </div>
      <div
        className={`pt-3 py-2 px-2 xl:py-5 text-sm xl:text-base text-wwlBlack`}
      >
        <h1 className="font-sourcesanspro leading-5" style={lineBreakStyles}>
          {item.title}
        </h1>
        <div className="flex items-center justify-between mt-1 sm:mt-2 flex-wrap md:flex-wrap">
          <h3 className="font-hind mt-1 text-sm xl:text-base">
            {item?.cook_time || item.cookTime} mins
          </h3>
          <div className="relative z-40">
            <DropDownMenu
              otherProps={{
                setCount,
                title: count === 1 ? 'Serving' : 'Servings',
                increment,
                decrement,
                count,
              }}
              show={showServingCountMenu}
              rowIndex={rowIndex}
              itemIndex={itemIndex}
              recipe={item}
              setShow={setShowServingCountMenu}
              counterMenu={true}
              changeHandler={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;
