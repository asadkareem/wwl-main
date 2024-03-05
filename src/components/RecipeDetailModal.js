import {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";
import RecipeHeader from "../pages/RecipeDetail/components/RecipeHeader";
import RecipeInstructions from "../pages/RecipeDetail/components/components/RecipeInstructions";
import {getRequest} from "../redux/wwlAPI";
import {XIcon} from "@heroicons/react/outline";
import Loader from "./Loader";

export default function RecipeDetailModal({open, setOpen, modalLoader}) {
  const {currentRecipe} = useSelector(state => state.recipe);
  const [tabData, setTabData] = useState({default_ingredients: '', default_instructions: ''});
  const {primaryDiet, isGlutenFree, isDairyFree} = useSelector(state => state.user);
  let {currentUser} = useSelector(state => state.user);
  const [servingsCount, setServingsCount] = useState(null);
  const [loadingTab, setLoadingTab] = useState(false);
  const isFirstRender = useRef(true);
  const {
    prep_time,
    cook_time,
    servings,
    default_ingredients,
    default_instructions,
    _id
  } = currentRecipe;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLoadingTab(true);

    const dietParam = isDairyFree && primaryDiet === 'Omnivore' ? 'dairy_free' : primaryDiet.toLowerCase();
    const unitPreference = currentUser?.unit_preference;

    getRequest(`/recipes/get_recipe_details/${currentRecipe._id}?diet=${dietParam}&unit_preference=${unitPreference}&is_gluten_free=${isGlutenFree}`, {})
      .then(res => {
        setTabData(res.data);
        setLoadingTab(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryDiet, isDairyFree, isGlutenFree])

  useEffect(() => {
    setServingsCount(currentRecipe.servings)
    setTabData(currentRecipe)
  }, [currentRecipe]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setOpen}>
        <div
          className="flex items-end justify-center min-h-screen pt-4 max-w-7xl mx-auto px-4 pb-20 text-center sm:block sm:p-0">
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
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-4xl">
              {modalLoader ? <div className='p-10'><Loader/></div> :
                <div className="bg-white px-4 pt-5 pb-4 sm:px-10 sm:py-4 sm:pb-4">
                  <XIcon className="h-6 w-6 text-gray-400 ml-auto cursor-pointer mb-3" onClick={() => setOpen(false)}/>
                  <RecipeHeader recipe={currentRecipe} isModal={true} currentUser={currentUser}/>
                  <RecipeInstructions prepTime={prep_time} cookTime={cook_time} servings={servings}
                                      servingsCount={servingsCount} setServingsCount={setServingsCount}
                                      ingredients={Object.values(tabData)[0] === "" ? default_ingredients : tabData.default_ingredients}
                                      instructions={Object.values(tabData)[1] === "" ? default_instructions : tabData.default_instructions}
                                      dairyFree={isDairyFree} glutenFree={isGlutenFree} loadingTab={loadingTab}
                                      isModal={true} _id={_id}/>
                </div>}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

  )
}