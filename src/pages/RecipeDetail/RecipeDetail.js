import React, {useEffect, useRef, useState} from 'react';
import RecipeHeader from "./components/RecipeHeader";
import RecipeInstructions from "./components/components/RecipeInstructions";
import Comment from "./components/Comment";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {populateRecipeDetails} from "../../redux/recipe/recipesThunk";
import {getRequest} from "../../redux/wwlAPI";
import {selectLoading, setLoading} from "../../redux/loader/loaderSlice";
import Loader from "../../components/Loader";
import {selectCurrentUser} from "../../redux/user/userSlice";
import SignInModal from "./components/components/SignInModal";
import PrintDetails from "./components/PrintDetails";

const RecipeDetail = () => {
  const [loadingTab, setLoadingTab] = React.useState(false);
  const [tabData, setTabData] = React.useState({default_ingredients: '', default_instructions: ''});
  const {id} = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const user = useSelector(selectCurrentUser);
  const [print, setPrint] = useState(false);
  const [servingsCount, setServingsCount] = useState(null);

  const [showSignInModal, setShowSignInModal] = React.useState(false);

  const isFirstRender = useRef(true);

  const {currentRecipe} = useSelector(state => state.recipe);
  const {primaryDiet, isDairyFree, isGlutenFree} = useSelector(state => state.user);
  let {currentUser} = useSelector(state => state.user);

  const handleNullUser = () => {
    setShowSignInModal(true);
  }

  useEffect(() => {
    // the initial detail req contains some data so no need to make another req(prevented by isFirstRender)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (currentUser === null) {
      handleNullUser();
      return;
    }
    setLoadingTab(true);

    const dietParam = isDairyFree && primaryDiet === 'Omnivore' ? 'dairy_free' : primaryDiet.toLowerCase();
    const unitPreference = currentUser?.unit_preference;

    getRequest(`/recipes/get_recipe_details/${id}?diet=${dietParam}&unit_preference=${unitPreference}&is_gluten_free=${isGlutenFree}`, {})
      .then(res => {
        setTabData(res.data);
        setLoadingTab(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryDiet, isDairyFree, isGlutenFree])

  useEffect(() => {
    setServingsCount(currentRecipe.servings)
  }, [currentRecipe]);
  useEffect(() => {
    async function fetchData() {
      dispatch(setLoading(true));
      await dispatch(populateRecipeDetails({id, userId: user?._id, primaryDiet, isGlutenFree}));
      dispatch(setLoading(false));
    }

    fetchData().catch(e => console.error(e));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);
  useEffect(() => {
    if (print) {
      window.print()
    } else {
      window.addEventListener('afterprint', e => setPrint(false));
      return () => {
        window.removeEventListener('afterprint', e => setPrint(false));
      };
    }
  }, [print]);

  const {
    prep_time,
    cook_time,
    servings,
    default_ingredients,
    default_instructions,
    description,
  } = currentRecipe;
  if (loading) {
    return <Loader/>
  }
  return (
    <>
      <div
        className="bg-wwlWhite mx-6 md:p-8 p-6 border border-wwlBorderColor rounded-xl md:rounded-2xl mt-10 print-hide">
        <RecipeHeader setPrint={setPrint} recipe={currentRecipe} handleNullUser={handleNullUser}
                      currentUser={currentUser}/>
        <RecipeInstructions prepTime={prep_time} cookTime={cook_time} servings={servings}
                            ingredients={Object.values(tabData)[0] === "" ? default_ingredients : tabData.default_ingredients}
                            instructions={Object.values(tabData)[1] === "" ? default_instructions : tabData.default_instructions}
                            dairyFree={isDairyFree} glutenFree={isGlutenFree} loadingTab={loadingTab}
                            servingsCount={servingsCount} setServingsCount={setServingsCount}/>

        <Comment description={description}/>
        <p
          className='font-base max-w-xl mx-auto font-inter text-xs text-wwlGray500 mt-0 text-center sm:text-xs sm:mt-2'>Did
          you like this recipe? Don't forget to rate it and share a photo of your meal prep masterpiece in
          our <a href="https://www.facebook.com/groups/workweekpreppers" className="font-bold text-wwlOrange">Facebook
            Group</a> !</p>
        <SignInModal open={showSignInModal} setOpen={setShowSignInModal}/>
      </div>
      <PrintDetails recipe={currentRecipe} servingsCount={servingsCount}/>
    </>);
};

export default RecipeDetail;