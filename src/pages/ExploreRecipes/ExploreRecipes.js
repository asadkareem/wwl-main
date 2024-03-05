import React, {useState} from 'react';
import Header from './components/Header';
import PageWithTableLayout from "../../components/Layouts/PageWithTableLayout";
import RecipeRow from "../../components/DataTable/components/RecipeRow";
import {useDataWithPagination} from "../../utilis/customHooks";
import {getAllRecipes} from "../../redux/recipe/recipesThunk";
import {selectAllRecipes, selectGettingAllRecipesStatus} from "../../redux/recipe/recipesSlice";
import {useSelector} from "react-redux";
import {selectLoading} from "../../redux/loader/loaderSlice";
import Loader from "../../components/Loader";
import SortingFiltersMenu from "../../components/SortingFiltersMenu";

const ExploreRecipes = () => {
    const [selectFilter, setSelectedFilter] = useState({id: 1, name: "Date"})
    const [selectedSort, setSelectedSort] = useState({id: 2, name: "Descending", value:'desc'})
    const {items, setPageNumber} = useDataWithPagination(getAllRecipes, selectGettingAllRecipesStatus, selectAllRecipes, selectFilter, selectedSort)
    const loading = useSelector(selectLoading)
    if (loading) {
        return <Loader/>
    }
    return (
        <>
            <PageWithTableLayout TableRow={RecipeRow} items={items?.recipes} setPageNumber={setPageNumber}
                                 pagination={items?.pagination}>
                <div className='block sm:hidden px-6 pt-9'>
                    <h1 className='font-inter font-semibold text-3xl mb-5'>We’re committed to bringing you easy, no-stress,
                        delicious food. </h1>
                    <h1 className='mt-8 text-wwlGray900 font-bold text-lg mb-4'>Browse All Recipes</h1>
                </div>
                <div className='hidden sm:block'>
                    <Header/>
                </div>
                <SortingFiltersMenu selected={selectFilter} setSelected={setSelectedFilter} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>
            </PageWithTableLayout>
            <p className='max-w-sm mx-auto px-3 pb-4 font-base block font-inter text-xs text-wwlGray500 mt-2 text-center sm:text-sm  sm:hidden'>Not sure what to make? Head over to our <a href="https://www.facebook.com/groups/workweekpreppers" className="font-bold text-wwlOrange">Facebook Group</a> to find out what Members’ favorites are.</p>
        </>
    );
};

export default ExploreRecipes;