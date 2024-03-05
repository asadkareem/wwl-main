import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectLoading} from "../../redux/loader/loaderSlice";
import {useDataWithPagination} from "../../utilis/customHooks";
import {getUserFavorites} from "../../redux/user/userThunk";
import {
  selectFavoriteRecipes,
  selectFavoritesStatus
} from "../../redux/user/userSlice";
import Loader from "../../components/Loader";
import PageWithTableLayout from "../../components/Layouts/PageWithTableLayout";
import SortingFiltersMenu from "../../components/SortingFiltersMenu";
import RecipeRow from "../../components/DataTable/components/RecipeRow";
import Button from "../../components/Button";
import {useNavigate} from "react-router-dom";
import {BookmarkIcon, HeartIcon} from "@heroicons/react/outline";

const SavedRecipes = () => {

  const navigate = useNavigate();

  const [selectFilter, setSelectedFilter] = useState({id: 1, name: "Date"})
  const [selectedSort, setSelectedSort] = useState({id: 1, name: "Descending", value: 'desc'})
  const loading = useSelector(selectLoading);
  const {
    items,
    setPageNumber
  } = useDataWithPagination(getUserFavorites, selectFavoritesStatus, selectFavoriteRecipes, selectFilter, selectedSort);

  useEffect(() => {
    if (items?.pagination?.currentPage > 1 && items?.recipes?.length === 0) setPageNumber(prevState => prevState - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const favoriteRecipes = useSelector(selectFavoriteRecipes);

  if (loading) {
    return <Loader/>
  }
  return (
    <div className='mt-10'>
      <div className='block sm:hidden px-4 pt-5'>
        <h1 className='font-inter font-semibold text-3xl mb-5'>My Saved Recipes</h1>
      </div>
      <div className='py-6 rounded-2xl bg-wwlWhite shadow-wwlDefault w-full'>
        {/*For larger screen*/}
        <PageWithTableLayout
          TableRow={RecipeRow}
          items={favoriteRecipes?.recipes}
          setPageNumber={setPageNumber}
          pagination={favoriteRecipes?.pagination}
          currentTab='My Favorites'
        >
          <div
            className='sm:flex sm:flex-col lg:flex-row justify-between items-center mb-10 px-4 lg:px-10'>
            <h1 className='hidden sm:block font-chivo text-3xl xl:text-4xl font-bold text-wwlBlack sm:mb-8 lg:mb-0'>My Saved
              Recipes</h1>
            <div className='flex items-center gap-3 justify-center sm:justify-start'>
              <Button btnFilled={true} smallButton={true} btnText='My Favorites'  BtnIcon={HeartIcon} extraClasses="text-white font-inter bg-wwlOrange rounded-lg border-2 border-wwlOrange w-fit py-1.5 px-4" iconExtraClasses='w-6 h-6 hover:text-wwlOrange hidden sm:inline' onClick={e=>navigate('/saved-recipes?page=1')}/>
              <Button smallButton={true} btnText='Saved For Later' BtnIcon={BookmarkIcon} extraClasses="text-wwlGray500 bg-wwlWhite border-2 border-wwlGray500 font-inter rounded-lg w-fit py-1.5 px-4" iconExtraClasses='w-6 h-6 hover:text-wwlOrange hidden sm:inline' onClick={e=>navigate('/bookmark-recipes?page=1')}/>
            </div>
          </div>
          {favoriteRecipes?.recipes?.length > 0 &&
            <SortingFiltersMenu selected={selectFilter} setSelected={setSelectedFilter} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>}

        </PageWithTableLayout>
      </div>
    </div>
  );
};

export default SavedRecipes;