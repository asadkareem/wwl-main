// import React, {useEffect, useState} from 'react';
// import PageWithTableLayout from "../../components/Layouts/PageWithTableLayout";
// import RecipeRow from "../../components/DataTable/components/RecipeRow";
// import {useDataWithPagination} from "../../utilis/customHooks"
// import Tabs from "../../components/Tabs";
// import {getUserBookmarked, getUserFavorites} from "../../redux/user/userThunk";
// import {
//   selectBookmarkedRecipes,
//   selectBookmarkedStatus,
//   selectFavoriteRecipes,
//   selectFavoritesStatus
// } from "../../redux/user/userSlice";
// import {useSelector} from "react-redux";
// import SortingFiltersMenu from "../../components/SortingFiltersMenu";
// import Loader from "../../components/Loader";
// import {selectLoading} from "../../redux/loader/loaderSlice";
// import {useMediaQuery} from "react-responsive";
// import {useSearchParams} from "react-router-dom";
//
// const BookmarkItems = ({selectFilter, setSelectedFilter}) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [currentTab, setCurrentTab] = useState(searchParams.get('tab') === 'favorite' ? 'My Favorites' : 'Saved For Later');
//   const [selectedSort, setSelectedSort] = useState({id: 1, name: "Descending", value: 'desc'})
//   const loading = useSelector(selectLoading);
//   const {
//     items,
//     setPageNumber
//   } = useDataWithPagination(getUserFavorites, selectFavoritesStatus, selectFavoriteRecipes, selectFilter, selectedSort);
//   const {
//     items: bookedItems,
//     setPageNumber: setBookedPage
//   } = useDataWithPagination(getUserBookmarked, selectBookmarkedStatus, selectBookmarkedRecipes, selectFilter, selectedSort);
//
//   const [tabs, setTabs] = useState([
//     {name: 'My Favorites', current: true},
//     {name: 'Saved For Later', current: false}
//   ]);
//
//   useEffect(() => {
//     if (items?.pagination?.currentPage > 1 && items?.recipes?.length === 0) setPageNumber(prevState => prevState - 1);
//     if (bookedItems?.pagination?.currentPage > 1 && bookedItems?.recipes?.length === 0) setPageNumber(prevState => prevState - 1);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [items, bookedItems]);
//
//   const favoriteRecipes = useSelector(selectFavoriteRecipes);
//   const bookedRecipes = useSelector(selectBookmarkedRecipes);
//   const isSmallerScreen = useMediaQuery({query: '(max-width: 640px)'});
//
//   useEffect(() => {
//     setSearchParams(prevSearchParams => ({
//       ...prevSearchParams,
//       tab: currentTab === 'My Favorites' ? 'favorite' : 'bookmarked'
//     }));
//   }, [currentTab]);
//
//
//   if (loading) {
//     return <Loader/>
//   }
//   return (
//     <div className='mt-10'>
//       <div className='block sm:hidden px-4 pt-5'>
//         <h1 className='font-inter font-semibold text-3xl mb-5'>My Saved Recipes</h1>
//       </div>
//       <div className='py-6 rounded-2xl bg-wwlWhite shadow-wwlDefault w-full'>
//         {/*For larger screen*/}
//         <PageWithTableLayout
//           TableRow={RecipeRow}
//           items={currentTab === 'My Favorites' ? favoriteRecipes?.recipes : bookedRecipes?.recipes}
//           setPageNumber={currentTab === 'My Favorites' ? setPageNumber : setBookedPage}
//           pagination={currentTab === 'My Favorites' ? favoriteRecipes?.pagination : bookedRecipes?.pagination}
//           currentTab={currentTab}
//         >
//           <div
//             className='sm:flex sm:flex-col lg:flex-row justify-between items-center mb-10 px-4 lg:px-10'>
//             <h1 className='hidden sm:block font-chivo text-3xl xl:text-4xl font-bold text-wwlBlack sm:mb-8 lg:mb-0'>My Saved
//               Recipes</h1>
//             <div className='flex items-center gap-3'>
//               <Tabs tabs={tabs} setCurrentTab={setCurrentTab} setTabs={setTabs} block={!isSmallerScreen}/>
//             </div>
//           </div>
//           {favoriteRecipes?.recipes?.length > 0 && currentTab === 'My Favorites' &&
//             <SortingFiltersMenu selected={selectFilter} setSelected={setSelectedFilter} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>}
//           {bookedRecipes?.recipes?.length > 0 && currentTab === 'Saved For Later' &&
//             <SortingFiltersMenu selected={selectFilter} setSelected={setSelectedFilter} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>}
//         </PageWithTableLayout>
//       </div>
//     </div>
//   );
// };
//
// export default BookmarkItems;