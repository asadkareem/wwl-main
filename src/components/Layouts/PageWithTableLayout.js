import React, {useEffect, useState} from 'react';
import DataTable from "../DataTable/DataTable";
import RecipeCard from "../RecipeCard/RecipeCard";
import Pagination from "../Pagination/Pagination";

import {useLocation, useSearchParams} from "react-router-dom";
import RecipeDetailModal from "../RecipeDetailModal";

const PageWithTableLayout = ({
                               headers,
                               setHeaders,
                               items,
                               TableRow,
                               setPageNumber,
                               pagination,
                               children,
                               currentTab,
                               additionalParam = '',
                             }) => {
  const location = useLocation().pathname;
  const [searchParams,setSearchParam] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [modalLoader, setModalLoader] = useState(false)
  const defaultHeaders = useState([{
    title: "Name", filterDirection: "asc", filterActive: false, visibleOnMobile: true,
  }, {
    title: "Rating", filterDirection: "asc", filterActive: false, visibleOnMobile: true,
  }, {
    title: "Prep Time", filterDirection: "asc", filterActive: false, visibleOnMobile: false,
  }, {
    title: "Cook Time", filterDirection: "asc", filterActive: false, visibleOnMobile: false,
  },]);

  useEffect(()=>{
    setPageNumber(searchParams.get('page'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('page')])

  return (<div>
    {children}
    {location === '/explore-recipes' ? <>
        <div className='hidden md:block max-w-6xl mx-auto'>
          <div className='mt-10 grid lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-3 justify-items-center'>
            {items?.length > 0 ? items?.map((recipe, index) => {
              return (<RecipeCard setModalLoader={setModalLoader} setOpen={setOpen} key={recipe._id}
                                  recipe={recipe}/>)
            }) : <h1 className='text-xl font-bold'>No recipes found</h1>}
          </div>

          {pagination && <Pagination
            currentPage={Number(pagination?.currentPage)}
            totalCount={pagination?.totalCount}
            pageSize={location === '/explore-recipes' ? 18 : 9}
            onPageChange={page => {
              setSearchParam({page})
            }}
          />}

          <RecipeDetailModal modalLoader={modalLoader} open={open} setOpen={setOpen}/>
        </div>
        <div className='block md:hidden'>
          {items?.length > 0 ? <DataTable items={items} pageSize={10} headers={headers || defaultHeaders}
                                          TableRow={TableRow}
                                          additionalParam={additionalParam}
                                          paginationDetails={pagination} setSearchParam={setSearchParam}
                                          currenTab={currentTab}/> :
            <p className="font-base font-inter text-lg text-wwlGray500 text-center">There's nothing here
              Yet!</p>}
        </div>
      </>
      : (items?.length > 0 ? <DataTable items={items} pageSize={10} headers={headers || defaultHeaders}
                                        TableRow={TableRow}
                                        additionalParam={additionalParam}
                                        paginationDetails={pagination} setSearchParam={setSearchParam}
                                        currenTab={currentTab}/> :
        <p className="font-base font-inter text-lg text-wwlGray500 text-center mt-8">There's nothing here
          Yet!</p>)}
  </div>);
};

export default PageWithTableLayout;