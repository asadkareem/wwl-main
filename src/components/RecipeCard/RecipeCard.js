import React, { useState } from 'react';
import { HeartIcon } from '@heroicons/react/outline';
import { BookmarkIcon } from '@heroicons/react/outline';
import StarIconFilled from '../../assets/icons/star-filled.svg';
import CommentsIcon from '../../assets/icons/comments.svg';
import MealPlanMicroView from '../MealPlanMicroView/MealPlanMicroView';
import {
  selectClickedOutside,
  selectCurrentUser, selectUser,
  updateEmptyCardRecipe,
  updateLikedRecipes,
} from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PlusIcon } from '@heroicons/react/solid';
import Button from '../Button';
import { useLocation } from 'react-router-dom';
import { addBookmarked, addFavorite } from '../../redux/user/userThunk';
import { toast } from 'react-hot-toast';
import { populateRecipeDetails } from '../../redux/recipe/recipesThunk';
import { ThreeCircles } from 'react-loader-spinner';

const RecipeCard = ({
  recipe,
  setSidebarOpen,
  shadowDark,
  menuInCenter = false,
  setOpen,
  setModalLoader,
  index
}) => {
  const currentUser = useSelector(selectCurrentUser);
  const { title, primary_image, average_rating, _id } = recipe;
  const {primaryDiet, isGlutenFree} = useSelector(selectUser);
  const recipeSubtitle = title?.split('With');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingHeart, setLoadingHeart] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const clicked = useSelector(selectClickedOutside);
  const currentPath = useLocation().pathname;
  const dispatch = useDispatch();

  const handleHeartClick = async (e, _id, index) => {
    if (loadingHeart) return;
    const svgElement = e.target.closest('svg.heart');
    svgElement.classList.toggle('fill_heart');
    e.preventDefault();
    setLoadingHeart(true);
    await dispatch(addFavorite(_id));
    if (index !== undefined) {
      // dispatch(updateSingleRecipe({type: 'favorite', index}));
      dispatch(updateLikedRecipes({ type: 'favorite', index }));
    }
    if (svgElement.classList.contains('fill_heart')) {
      toast.success('Recipe added to favorites');
    } else {
      toast.success('Recipe removed from favorites');
    }
  };

  const handleBookmark = async (e, _id, index) => {
    if (loadingBookmark) return;
    const svgElement = e.target.closest('svg.book');
    svgElement.classList.toggle('fill_heart');
    e.preventDefault();
    setLoadingBookmark(true);
    await dispatch(addBookmarked(_id));
    if (index !== undefined) {
      dispatch(updateLikedRecipes({ type: 'bookmarked', index }));
      // dispatch(updateSingleRecipe({type: 'bookmarked', index}))
    }
    if (svgElement.classList.contains('fill_heart')) {
      toast.success('Recipe added to bookmarks');
    } else {
      toast.success('Recipe removed from bookmarks');
    }
  };

  const updateToEmptyCard = (e) => {
    e.preventDefault();
    const recipeData = {
      title: recipe.title,
      primaryImage: recipe.primary_image,
      id: recipe._id,
      cookTime: recipe.cook_time,
      details: {
        collapsed: 1,
        diet: 'Omnivore',
        isDairyFree: false,
        isGlutenFree: false,
      },
      servings: recipe.servings,
      diet: 'Omnivore',
      isDairyFree: false,
      isGlutenFree: false,
    };
    setSidebarOpen(false);
    setTimeout(() => {
      dispatch(updateEmptyCardRecipe(recipeData));
    }, 200);
  };

  function showRecipeModal() {
    setLoading(true);
    setModalLoader(true);

    async function fetchRecipeDetails() {
      await dispatch(
        populateRecipeDetails({ id: recipe._id, userId: currentUser?._id, primaryDiet, isGlutenFree})
      );
    }

    fetchRecipeDetails().then(() => {
      setOpen(true);
      setModalLoader(false);
      setLoading(false);
    });
  }
  return (
    <div className="relative">
      {loading && (
        <div
          className="absolute min-h-[350px] z-50 w-80 left-1/2 transform -translate-x-1/2 select-none rounded-3xl ml-0 lg:ml-1"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <ThreeCircles
            height="50"
            width="50"
            color="#FF644C"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      )}
      <div
        className={`ml-0 lg:ml-2 pb-5 static ease-in-out duration-300 ${
          currentPath === '/search' || currentPath === '/explore-recipes'
            ? 'sm:hover:mt-[-6px]'
            : ''
        }`}
      >
        <div
          className={`hover:shadow-wwlDragDropShadow bg-wwlWhite ${
            shadowDark ? 'shadow-wwlDragDropShadow' : 'shadow-wwlDefault'
          } w-80 mx-auto  rounded-3xl group hover:decoration-underline cursor-pointer`}
        >
          {/*<NavLink to={`/recipe-detail/${recipe._id || recipe.id}`} target='_blank' className='block h-full flex flex-col'>*/}
          <div className="block h-full flex flex-col">
            <div className="relative rounded-t-3xl h-44 overflow-hidden">
              <div
                className="absolute h-full w-full"
                onClick={(e) => showRecipeModal()}
                style={{
                  background:
                    'linear-gradient(247.81deg, rgba(0, 0, 0, 0.4) 3.05%, rgba(0, 0, 0, 0) 73.64%)',
                }}
              ></div>

              <div className="absolute top-3 right-3 flex h-7 gap-2">
                <div className="h-5 block w-full xl:h-6 xl:w-6 relative">
                  {/*{loadingHeart && <div className='absolute'><Loader width='24px' height='24px'/></div>}*/}
                  <HeartIcon
                    className={`heart w-6 cursor-pointer md:hover:fill-wwlWhite transition-colors duration-100 text-wwlWhite
                    ${
                      recipe.is_favorite ||
                      currentUser?.favorite_recipes?.includes(_id)
                        ? 'fill_heart'
                        : ''
                    }`}
                    onClick={(e) =>
                      handleHeartClick(e, _id, index).then((r) =>
                        setLoadingHeart(false)
                      )
                    }
                  />
                </div>
                <div className="h-5 block w-full xl:h-6 xl:w-6 relative">
                  {/*{loadingBookmark && <div className='bg-white absolute'><Loader width='24px' height='24px'/></div>}*/}
                  <BookmarkIcon
                    className={`book w-6 cursor-pointer md:hover:fill-wwlWhite text-wwlWhite transition-colors duration-100 ${
                      recipe.is_bookmarked ||
                      currentUser?.bookmarked_recipes?.includes(_id)
                        ? 'fill_heart'
                        : ''
                    }`}
                    onClick={(e) =>
                      handleBookmark(e, _id, index).then((r) =>
                        setLoadingBookmark(false)
                      )
                    }
                  />
                </div>
              </div>
              {/*recipeSubtitle && recipeSubtitle[0]?.length < 30 && !recipeSubtitle[1] ? 'h-48' : 'h-[170px]'*/}
              <img
                src={primary_image}
                alt="recipe"
                className={`w-full object-fill ${
                  recipeSubtitle &&
                  recipeSubtitle[0]?.length < 30 &&
                  !recipeSubtitle[1]
                    ? 'h-48'
                    : 'h-44'
                }`}
              />
            </div>
            <div className="px-7 py-4 text-wwlBlack flex-grow flex flex-col justify-between">
              <div className="flex items-center mb-1">
                <img
                  src={StarIconFilled}
                  alt="star-icon"
                  className="inline-block w-3"
                />
                <p className="font-inter font-semibold text-xs ml-1.5">
                  {average_rating?.toFixed(1)}
                </p>
              </div>
              {recipeSubtitle && (
                <h1
                  className="font-chivo text-lg group-hover:underline"
                  onClick={(e) => showRecipeModal()}
                >
                  {recipeSubtitle[0]}
                </h1>
              )}
              {recipeSubtitle && recipeSubtitle[1] && (
                <h3 className="font-chivo text-sm group-hover:underline h-7">
                  With {recipeSubtitle[1]}
                </h3>
              )}

              {recipeSubtitle &&
                recipeSubtitle[0]?.length < 30 &&
                !recipeSubtitle[1] && (
                  <h3 className="font-chivo text-lg">&nbsp;</h3>
                )}
              <div className="flex-grow flex items-end justify-between mt-8 relative">
                <div className="flex items-center mb-2.5 relative">
                  <img
                    src={CommentsIcon}
                    alt="comments-icon"
                    className="inline-block w-4"
                  />
                  <p className="font-inter font-semibold text-xs ml-1.5">
                    {recipe?.community_note_count}
                  </p>
                </div>
                {currentPath === '/meal-planning/meal-planner' ? (
                  <Button
                    btnText="Add to Meal Plan"
                    smallButton={true}
                    BtnIcon={PlusIcon}
                    extraClasses="rounded-lg border-2 border-wwlOrange hover:bg-wwlOrange text-wwlOrange hover:text-wwlWhite transition-colors duration-300 "
                    iconExtraClasses="hover:text-wwlWhite"
                    onClick={(e) => updateToEmptyCard(e)}
                  />
                ) : (
                  <MealPlanMicroView
                    show={show}
                    setShow={setShow}
                    recipe={recipe}
                    clickedOutside={clicked}
                    menuInCenter={menuInCenter}
                    currentUser={currentUser}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecipeCard;
