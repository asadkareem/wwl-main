import React, {createRef, Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import {SearchIcon} from "@heroicons/react/solid";
import AutoComplete from "../../../TopBar/components/AutoComplete";
import {useDispatch, useSelector} from "react-redux";
import {searchRecipesStatus, selectAllRecipes} from "../../../../redux/recipe/recipesSlice";
import RecipeCard from "../../../RecipeCard/RecipeCard";
import {selectIsTouchScreen} from "../../../../redux/navigation/navigationSlice";
import Tabs from "../../../Tabs";
import {getAllRecipes, searchRecipes} from "../../../../redux/recipe/recipesThunk";
import {getRequest, postRequest} from "../../../../redux/wwlAPI";
import {Circles} from "react-loader-spinner";
import InfiniteScroll from "react-infinite-scroller";
import {getUserBookmarked, getUserFavorites} from "../../../../redux/user/userThunk";
import Loader from "../../../Loader";
import {
  selectBookmarkedRecipes,
  selectBookmarkedStatus,
  selectFavoriteRecipes,
  selectFavoritesStatus
} from "../../../../redux/user/userSlice";
import RecipeDetailModal from "../../../RecipeDetailModal";

const DragDrop = ({sidebarOpen, setSidebarOpen}) => {

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState({value: "", clicked: false});
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState([
    {name: 'All', current: true},
    {name: 'Favorites', current: false},
    {name: 'Saved for Later', current: false},
  ]);
  const [currentTab, setCurrentTab] = useState('All');
  const isTouchScreen = useSelector(selectIsTouchScreen);
  const scrollParentRef = createRef()
  const dispatch = useDispatch()
  const items = useSelector(selectAllRecipes)
  const searchStatus = useSelector(searchRecipesStatus)
  const favStatus = useSelector(selectFavoritesStatus);
  const bookedStatus = useSelector(selectBookmarkedStatus);
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const bookmarkedRecipes = useSelector(selectBookmarkedRecipes);
  const {recipes: finalRecipes} = useSelector(state => state.recipe.filteredRecipes)
  const [newItems, setNewItems] = useState([])
  const [modalLoader, setModalLoader] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [displaySuggestions, setDisplaySuggestions] = useState(false)
  const [favItems, setFavItems] = useState({
    data: [], hasMore: false
  })
  const [bookItems, setBookItems] = useState({
    data: [], hasMore: false
  })
  const [searchItem, setSearchItem] = useState({
    data: [], hasMore: false
  })
  const [page, setPage] = useState(2)
  useEffect(() => {
    async function fetchdata() {
      setLoading(true)
      if (currentTab === 'All') {
        await dispatch(getAllRecipes({pageNumber: 1}))
        setLoading(false)
      } else if (currentTab === 'Favorites') {
        await dispatch(getUserFavorites({pageNumber: 1}))
        setLoading(false)
      } else if (currentTab === 'Saved for Later') {
        await dispatch(getUserBookmarked({pageNumber: 1}))
        setLoading(false)
      }
    }

    fetchdata().catch(e => console.log(e))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTab]);

  useEffect(() => {
    setNewItems(items)
    setFavItems({data: favoriteRecipes?.recipes || [], hasMore: true})
    setBookItems({data: bookmarkedRecipes?.recipes || [], hasMore: true})
    setSearchItem({data: finalRecipes || [], hasMore: true})
  }, [items, favoriteRecipes, bookmarkedRecipes, finalRecipes]);

  const fetchMoreData = async () => {
    if (!loading) {
      setLoading(true)
      const data = await getRequest(`/recipes/all/${page}`);
      const check = {
        ...newItems,
        ...data.data,
        recipes: [...newItems.recipes, ...data.data.recipes]
      }
      setNewItems(check)
      setPage(page + 1);
      setLoading(false)
    }
  }

  const fetchMoreItems = async (type) => {
    let items, setItems;

    switch (type) {
      case 'favorites':
        items = favItems;
        setItems = setFavItems;
        break;
      case 'saved for later':
        items = bookItems;
        setItems = setBookItems;
        break;
      case 'search':
        items = searchItem;
        setItems = setSearchItem;
        break;
      default:
        break;
    }

    if (items?.data?.length < 9) {
      setItems(prevItems => ({...prevItems, hasMore: false}));
      return 0;
    }

    let response;
    if (type === 'search') {
      if (page !== 1 && !loading) {
        setLoading(true);
        response = await postRequest(`/recipes/sorted/title/desc/9/${Number(page)}`, {searchTags: searchTerm.value});
        setLoading(false);
      }
    } else {
      if (!loading) {
        setLoading(true);
        response = await getRequest(`/recipes/${type === 'saved for later' ? 'bookmarked' : 'favorites'}/${page}`);
        setLoading(false);
      }
    }

    if (response) {
      const combinedRecipes = items.data.concat(response?.data.recipes);
      const hasMore = response?.data.recipes.length >= 9;
      setItems({data: combinedRecipes, hasMore});
      if (hasMore) {
        setPage(page + 1);
      }
    }
  };

  function fetchData(data) {
    setCurrentTab('Search')
    setLoading(true)
    fetchSearchData(data).then(r => setLoading(false))
  }

  useEffect(() => {
    if (searchTerm.value.length > 0 && searchTerm.clicked) {
      scrollParentRef.current.scrollTo(0, 0)
      setPage(2)
      fetchData(searchTerm.value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm.clicked])

  function handleKeyDown(e, value) { // when clicked, the autoComplete sets the state to [..] but when enter the state is {} or string
    if (e.key === "Enter") {
      setPage(2)
      scrollParentRef.current.scrollTo(0, 0)
      setDisplaySuggestions(false);
      let text = searchTerm.value;
      if(text === ''){
        return
      }
      const tagObj = filteredSuggestions.find(item => item.tag === text);
      const data = typeof value === 'string' ? (tagObj ? tagObj : {type:null , tag: text}) : (Array.isArray(value) ? value[0] : value);
      fetchData([data])
    }
  }

  async function fetchSearchData(data) {
    await dispatch(searchRecipes({searchTags: data, page: 1}))
    setSearchTerm({value: data, clicked: false})
  }

  function handleClose(e) {
    const closestParent = e.target.closest('.close');
    if (closestParent === null) {
      setSidebarOpen(false)
    }
  }
  return (
    <>
      <RecipeDetailModal modalLoader={modalLoader} open={modalOpen} setOpen={setModalOpen}/>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 flex justify-end w-full z-50' onClose={setSidebarOpen}
                onClick={e => handleClose(e)}>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <div
              className='rounded-tl-2xl absolute h-screen flex flex-col max-w-sm w-full bg-wwlWhite overflow-hidden close'>
              <div className="flex justify-end">
                <button
                  type='button'
                  className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className='sr-only'>Close sidebar</span>
                  <XIcon className='h-6 w-6 text-black dark:text-white' aria-hidden='true'/>
                </button>
              </div>
              <div className='relative mb-4 px-6'>
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 pl-8 flex items-center">
                  <SearchIcon className="h-6 w-6 text-wwlBlack" aria-hidden="true"/>
                </div>
                <input
                  id="search"
                  name="search"
                  className="block bg-wwlInterfaceLightest w-full text-sm font-chivo focus:ring-0 focus:outline-none outline-none font-normal placeholder-black rounded-full py-2 pl-10 pr-2 text-sm border-none focus:border-none sm:text-sm"
                  placeholder="Search Recipes"
                  type="text"
                  value={searchTerm.value[0]?.tag || searchTerm.value}
                  autoComplete="off"
                  onChange={e => setSearchTerm({value: e.target.value.toLowerCase(), clicked: false})}
                  onKeyDown={e => handleKeyDown(e, searchTerm.value)}
                />
                {searchStatus === 'pending' &&
                  <div className='absolute top-1 right-6'><Loader width='28px' height='28px'/></div>}
                {/*WHEN CLICKED OR ENTERD THE STATE BECOMES AN ARRAY*/}
                {!Array.isArray(searchTerm.value) && <div className="absolute w-full z-40">
                  <AutoComplete searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                sidebarOpen={sidebarOpen}
                                setDisplaySuggestions={setDisplaySuggestions} displaySuggestions={displaySuggestions}
                                setFilteredSuggestions={setFilteredSuggestions}
                                filteredSuggestions={filteredSuggestions}/>
                </div>}
              </div>
              <div className='flex flex-col'>
                <div className='flex mb-10 px-4 justify-between'>
                  <Tabs setPage={setPage} tabs={tabs} setTabs={setTabs} setCurrentTab={setCurrentTab} customStyles={
                    {
                      currentTab: 'shadow-wwlTabShadow',
                      tabsStyles: 'px-7 text-xs  py-2 flex-grow font-inter whitespace-nowrap text-center rounded-md text-wwlGray700 inline-block focus:ring-0 font-inter font-medium'
                    }
                  }/>
                </div>
              </div>
              {newItems?.recipes &&
                <div
                  className={`relative overflow-y-scroll ${isTouchScreen ? 'scrollbar-hide' : 'scrollbar scrollbar-thin scrollbar-thumb-wwlOrange scrollbar-track-wwlGray200'}`}
                  ref={scrollParentRef}>
                  <InfiniteScroll pageStart={0}
                                  loadMore={currentTab === 'All' ? fetchMoreData : () => fetchMoreItems(currentTab.toLowerCase())}
                                  hasMore={currentTab === 'All' ? true : (currentTab === 'Favorites' ? favItems.hasMore : (currentTab === 'Saved for Later' ? bookItems.hasMore : searchItem.hasMore))}
                                  loader={
                                    <div key={'loader-loading'} className='flex justify-center py-2'>
                                      <Circles
                                        height="50"
                                        width="50"
                                        color="#FF644C"
                                        ariaLabel="circles-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={currentTab === 'All' ? true : (currentTab === 'Favorites' ? favItems.hasMore : (currentTab === 'Saved for Later' ? true : searchItem.hasMore))}
                                      />
                                    </div>
                                  }
                                  useWindow={false}
                                  getScrollParent={() => scrollParentRef.current}
                  >
                    {currentTab === 'All' && newItems?.recipes?.map((recipe, index) =>
                      <RecipeCard
                        setModalLoader={setModalLoader}
                        setOpen={setModalOpen}
                        setSidebarOpen={setSidebarOpen}
                        key={`${recipe._id}-${index}`}
                        index={index}
                        recipe={recipe} shadowDark={true}
                      />)}

                    {currentTab === 'Favorites' && favItems?.data?.length > 0 ?
                      favItems?.data?.map((recipe, index) => {
                        return <RecipeCard
                          setModalLoader={setModalLoader}
                          setOpen={setModalOpen}
                          setSidebarOpen={setSidebarOpen}
                          key={`${recipe._id}-${index}`}
                          recipe={recipe} shadowDark={true}
                          isFavorite={true}
                          index={index}
                        />
                      }) : (currentTab === 'Favorites' && favStatus === 'pending' ? <div className=''><Loader/></div> : currentTab === 'Favorites' && <p className="font-base font-inter text-lg text-wwlGray500 text-center">Nothing's here yet</p>)
                    }

                    {currentTab === 'Saved for Later' && bookItems?.data?.length > 0 ?
                      (bookItems?.data?.map((recipe, index) => {
                        return <RecipeCard
                          setModalLoader={setModalLoader}
                          setOpen={setModalOpen}
                          setSidebarOpen={setSidebarOpen}
                          key={`${recipe._id}-${index}`}
                          recipe={recipe} shadowDark={true}
                          isBookmarked={true}
                          index={index}
                        />
                      })) : (currentTab === 'Saved for Later' && bookedStatus === 'pending' ? <div><Loader/></div> : currentTab === 'Saved for Later' && <p className="font-base font-inter text-lg text-wwlGray500 text-center">Nothing's here yet</p>)
                    }

                    {currentTab === 'Search' && searchItem?.data?.length > 0 ? searchItem?.data?.map((recipe, index) => {
                        return <RecipeCard
                          setOpen={setModalOpen}
                          setModalLoader={setModalLoader}
                          setSidebarOpen={setSidebarOpen}
                          key={`${recipe._id}-${index}`}
                          isBookmarked={true}
                          index={index}
                          recipe={recipe} shadowDark={true}
                        />
                      }) :
                      (currentTab === 'Search' && searchStatus === 'pending' ? <Loader/> :
                        currentTab === 'Search' && <p className="font-base font-inter text-lg text-wwlGray500 text-center">Nothing's here yet</p>)
                    }

                  </InfiniteScroll>
                </div>
              }
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'></div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default DragDrop;