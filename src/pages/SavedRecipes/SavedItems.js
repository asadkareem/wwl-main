import React, {useEffect, useState} from 'react';
import {useDataWithPagination} from "../../utilis/customHooks";
import {getSavedRecipes} from "../../redux/user/userThunk";
import {selectSavedRecipe, selectSavedStatus} from "../../redux/user/userSlice";
import RecipeRow from "../../components/DataTable/components/RecipeRow";
import SortingFiltersMenu from "../../components/SortingFiltersMenu";
import PageWithTableLayout from "../../components/Layouts/PageWithTableLayout";
import {useSelector} from "react-redux";

const SavedItems = ({selectFilter, setSelectedFilter}) => {
  const [selectedSort, setSelectedSort] = useState({id: 1, name: "Descending", value: 'desc'})
  const {
    items,
    setPageNumber
  } = useDataWithPagination(getSavedRecipes, selectSavedStatus, selectSavedRecipe, selectFilter, selectedSort)

  useEffect(() => {
    if (items?.pagination?.currentPage > 1 && items?.recipes?.length === 0) setPageNumber(prevState => prevState - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);
  const savedRecipes = useSelector(selectSavedRecipe);
  return (
    <div className='mt-10'>
      <div className='block sm:hidden px-4 pt-5'>
        <h1 className='font-inter font-semibold text-3xl mb-5'>My Saved Recipes </h1>
      </div>
      <div className='py-6 rounded-2xl bg-wwlWhite shadow-wwlDefault w-full'>
        <PageWithTableLayout
          TableRow={RecipeRow}
          items={savedRecipes?.recipes}
          setPageNumber={setPageNumber}
          pagination={savedRecipes?.pagination}
          currentTab={''}
        >
          <div
            className='hidden sm:flex sm:flex-col lg:flex-row justify-between items-center mb-10 px-4 lg:px-10'>
            <h1 className='font-chivo text-3xl xl:text-4xl font-bold text-wwlBlack sm:mb-8 lg:mb-0'>My Saved
              Recipes</h1>
          </div>
          {savedRecipes?.recipes?.length > 0 && <SortingFiltersMenu selected={selectFilter} setSelected={setSelectedFilter} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>}
        </PageWithTableLayout>
      </div>
    </div>
  );
};

export default SavedItems;