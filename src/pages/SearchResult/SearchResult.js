import React, {useEffect, useState} from 'react';
import {ArrowLeftIcon} from "@heroicons/react/outline";
import NavigationLink from "../../components/NavigationLink";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import {useSelector, useDispatch} from "react-redux";
import {selectFilteredRecipes} from "../../redux/recipe/recipesSlice";
import {searchRecipes} from "../../redux/recipe/recipesThunk";
import Pagination from "../../components/Pagination/Pagination";
import {selectLoading, setLoading} from "../../redux/loader/loaderSlice";
import Loader from "../../components/Loader";
import RecipeDetailModal from "../../components/RecipeDetailModal";
import SortingFiltersMenu from "../../components/SortingFiltersMenu";
import {useSearchParams} from "react-router-dom";

const SearchResult = () => {
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const loading = useSelector(selectLoading);
  const [open, setOpen] = useState(false);
  const [modalLoader, setModalLoader] = useState(false)
  const filteredRecipes = useSelector(selectFilteredRecipes)
  // const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState({id: 2, name: "Descending", value: "desc"});
  const gridRows = (filteredRecipes?.recipes?.length < 4) ? 1 :
    (filteredRecipes?.recipes?.length < 6) ? 2 :
      3;
  const [selectedFilter, setSelectedFilter] = useState({id: 1, name: "Date"})

  useEffect(() => {
    async function fetchData(searchData) {
      dispatch(setLoading(true))
      if (searchParams.get('keyword')) {
        await dispatch(searchRecipes({
          searchTags: searchData ? searchData : JSON.parse(searchParams.get('keyword')),
          page: parseInt(searchParams.get('page')),
          filter: selectedFilter,
          selectedSort: selectedSort.value
        }));
      } else {
        await dispatch(searchRecipes({
          searchTags: searchData,
          page: parseInt(searchParams.get('page')),
          filter: selectedFilter
        }));
      }
    }

    if ((JSON.parse(searchParams.get('keyword'))?.length > 0 && (parseInt(searchParams.get('page')) > 1)) || (JSON.parse(searchParams.get('keyword')).length > 0 && selectedFilter)) {
      fetchData().then(e => dispatch(setLoading(false)))
    }
    if (searchParams.get('q')) {
      fetchData([{tag: searchParams.get('q'), type: "recipe"}]).then(e => dispatch(setLoading(false)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('page'), selectedFilter, searchParams.get('keyword'), selectedSort]);

  if (loading) {
    return <Loader/>
  }
  return (
    <div className='mt-10 mx-6'>
      <NavigationLink url={'/explore-recipes'} LinkIcon={ArrowLeftIcon} linkText='Back to Explore Recipes'
                      extraClasses='bg-wwlWhite text-wwlOrange hover:border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite px-4 border border-wwlOrange ml-8'/>
      <div className='mt-8 bg-wwlWhite rounded lg p-4 md:p-6'>
        <div>
          <h1 className='font-chivo font-semibold text-3xl md:text-4xl py-4 md:font-bold'>Search Results</h1>
          {filteredRecipes?.recipes?.length > 0 &&
            <SortingFiltersMenu selected={selectedFilter} setSelected={setSelectedFilter} selectedSort={selectedSort}
                                setSelectedSort={setSelectedSort}/>}
        </div>

        <div
          className={`mt-10 grid lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-${gridRows} justify-items-center`}>
          {
            filteredRecipes?.recipes?.length > 0 ? filteredRecipes?.recipes?.map((recipe, index) => {
              return (
                <RecipeCard setModalLoader={setModalLoader} setOpen={setOpen} key={recipe._id}
                            recipe={recipe}/>
              )
            }) : <h1 className='text-xl font-bold pb-6'>Oops! your search is too narrow!</h1>
          }
        </div>
        {filteredRecipes?.pagination && <Pagination
          currentPage={Number(filteredRecipes?.pagination?.currentPage || 0)}
          totalCount={filteredRecipes?.pagination?.totalCount}
          pageSize={9}
          onPageChange={page => {
            // setCurrentPage(page);
            setSearchParams({page, keyword: searchParams.get('keyword')})
          }}
        />}
        <RecipeDetailModal modalLoader={modalLoader} open={open} setOpen={setOpen}/>
      </div>
    </div>
  );
};

export default SearchResult;