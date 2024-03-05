import React, {useState} from 'react';
import NavigationLink from "../../NavigationLink";
import ToolTip from "../../ToolTip";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {hasMealPlaner, hasShoppingList} from "../../../redux/user/userSlice";
import Button from "../../Button";
import GoProModal from "../../GoProModal";
import {useMediaQuery} from "react-responsive";

const MealPlanRow = ({item, additionalParam, index}) => {
  const {currentUser} = useSelector((state) => state.user);
  const {_id, title, recipes, featured_date} = item
  const convertDate = new Date(featured_date)
  const date = new Intl.DateTimeFormat('en-US', {}).format(convertDate);
  const hasShoppingListPermission = useSelector(hasShoppingList);
  const hasMealPlanerPermission = useSelector(hasMealPlaner);
  const [open, setOpen] = useState(false)
  const largeScreen = useMediaQuery({query: '(max-width: 1024px)'})
  const smallScreen = useMediaQuery({query: '(max-width: 640px)'});

  const [openMenuIndex, setOpenMenuIndex] = useState(-1);
  const handleOpenClick = (index) => {
    if (openMenuIndex === index) {
      return setOpenMenuIndex(-1);
    }
    setOpenMenuIndex(index);
  };

  return (
    <>
      <tr>
        <td className='hidden sm:table-cell align-top pt-4 mr-4'>
          {title}
        </td>
        <td className='sm:hidden py-4 flex items-start justify-between'>
          {/*<img src={primary_image} alt="" className='h-16 w-16 rounded-full mr-6'/>*/}
          <div>
            <h1 onClick={() => handleOpenClick(index)}
                className='font-inter font-medium text-sm text-wwlGray900 cursor-pointer'>{item.title}</h1>
            <p onClick={() => handleOpenClick(index)}
               className='cursor-pointer text-wwlGray500 text-xs'>{recipes?.length} recipes <ChevronDownIcon
              className='ml-2 w-3 h-3 text-wwlGray500 inline'/></p>
            {openMenuIndex === index && (
              <ul className='list-disc mt-4'>
                {recipes?.filter(recipe => Object.keys(recipe).length !== 0).map((recipe) => {
                  return <li className='text-xs text-wwlGray500 underline cursor-pointer' key={recipe.title}>
                    <Link to={`/recipe-detail/${recipe.id}`}
                    >{recipe.title}</Link>
                  </li>;
                })}
              </ul>
            )}
          </div>
          <div>
            <div className='mb-1'>
              { hasMealPlanerPermission ?
                <NavigationLink
                  url={`/meal-planning/meal-planner?mp=${_id}&t=${title}${additionalParam}`}
                  linkText='Open' linkSubText='in Meal Planner'
                  extraClasses='bg-transparent text-wwlOrange border-wwlOrange hover:border-transparent hover:bg-wwlOrange hover:text-wwlWhite text-center w-full block lg:w-48 py-1 text-xs'/>:
                <Button btnText='Open' extraClasses='bg-transparent text-wwlOrange border border-wwlOrange hover:border-transparent hover:bg-wwlOrange hover:text-wwlWhite text-center w-full block lg:w-48 py-1 rounded-lg text-xs px-3.5' onClick={() => setOpen(true)}
                />}
            </div>
            <div>
              {hasShoppingListPermission ?
                <NavigationLink url={`/shopping-list?mp=${_id}&t=${title} (${currentUser.name} Version)`}
                                linkText={smallScreen ? 'Shop' : 'View'} linkSubText='Shopping List'
                                extraClasses='bg-wwlGreen text-wwlDarkBlue border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen text-center w-full block lg:w-48 py-1 text-xs'/> :
                <Button btnText={smallScreen ? 'Shop' : 'View'} extraClasses='bg-wwlGreen text-wwlDarkBlue border-transparent hover:bg-wwlWhite hover:text-wwlGreen text-center w-full block border lg:w-48 py-1 text-xs px-1 rounded-lg hover:border-wwlDarkBlue sm:px-[17px] lg:px-8' onClick={() => setOpen(true)}
                />}

            </div>
          </div>
        </td>
        <td className='hidden sm:table-cell align-top pt-4 text-center'>
          {date}
        </td>
        <td className="hidden sm:table-cell align-top pt-4 pr-2">
          <ul className='list-disc'>
            {recipes?.filter(recipe => Object.keys(recipe).length !== 0).map((recipe) => {
              return <li className='underline' key={recipe.title}>
                <Link to={`/recipe-detail/${recipe.id}`}
                >{recipe.title}</Link>
              </li>;
            })}
          </ul>
        </td>
        <td className='hidden sm:table-cell py-8'>
          <ToolTip content="Meal Planner" direction="top" extraClasses='mb-2'>
            {hasMealPlanerPermission ? <NavigationLink
                url={`/meal-planning/meal-planner?mp=${_id}&t=${title}${additionalParam ? `&${additionalParam}` : ''}`}
                linkText='Open' linkSubText='in Meal Planner'
              extraClasses='bg-transparent text-wwlOrange border-wwlOrange hover:border-transparent hover:bg-wwlOrange hover:text-wwlWhite text-center w-full lg:w-48'/> :
              <Button btnText={`Open ${largeScreen ? '' : 'in Meal Planner'} `} extraClasses={`bg-transparent text-wwlOrange hover:border-transparent hover:bg-wwlOrange hover:text-wwlWhite text-center w-full lg:w-48 border border-wwlOrange rounded-lg sm:px-[17px] lg:px-8`} onClick={() => setOpen(true)}
            />}

          </ToolTip>
          <ToolTip content="Shopping List" direction="bottom">
            {hasShoppingListPermission?
              <NavigationLink url={`/shopping-list?mp=${_id}&t=${title} (${currentUser.name} Version)`}
                              linkText='View' linkSubText='Shopping List'
                              extraClasses='bg-wwlGreen text-wwlDarkBlue border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen text-center w-full lg:w-48'/> :
              <Button btnText={`View ${largeScreen ? '' : 'Shopping List'}`}
                      extraClasses={`bg-wwlGreen text-wwlDarkBlue border-transparent hover:border-wwlDarkBlue hover:bg-wwlWhite hover:text-wwlGreen rounded-lg text-sm border sm:px-[17px] lg:px-8`} onClick={() => setOpen(true)}
              />}
          </ToolTip>
        </td>
      </tr>
      <GoProModal open={open} setOpen={setOpen}/>
    </>
  );
};

export default MealPlanRow;