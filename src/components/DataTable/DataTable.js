import React from "react";
import Spinner from "./components/Spinner";
import Pagination from "../Pagination/Pagination";

const DataTable = ({
                     items,
                     headers,
                     TableRow,
                     pageSize: PageSize = 10,
                     paginationDetails,
                     setSearchParam,
                     currenTab,
                     additionalParam,
                   }) => {
  const adsStatus = 'not loading'
  const desktopHeaders = headers.filter((item) => item.visibleOnMobile);
  const mobileHeaders = headers.filter((item) => !item.visibleOnMobile && !item.visibleOnMobileOnly);
  const visibleOnlyOnMobile = headers.filter((item) => item.visibleOnMobileOnly);
  //
  // const currentData = useMemo(() => {
  //     const firstPageIndex = (currentPage - 1) * PageSize;
  //     const lastPageIndex = firstPageIndex + PageSize;
  //     return items?.slice(firstPageIndex, lastPageIndex);
  // }, [currentPage]);


  // const handleAscDesc = (input) => {
  //     return input === "asc" ? "desc" : "asc";
  // };
  //
  // const updateFilter = (title) => {
  //     let tempHeaders = [...headers];
  //     for (let i = 0; i < tempHeaders.length; i++) {
  //         // If we get a match
  //         if (tempHeaders[i].title === title) {
  //             // Check current status and act appropriately.
  //             if (tempHeaders[i].filterActive) {
  //                 tempHeaders[i].filterDirection = handleAscDesc(
  //                     headers[i].filterDirection
  //                 );
  //             } else {
  //                 tempHeaders[i].filterActive = true;
  //             }
  //         }
  //         // If we are anything but the selected column
  //         else {
  //             tempHeaders[i].filterActive = false;
  //         }
  //     }
  //     setHeaders(tempHeaders);
  // };

  return (
    <>
      {adsStatus === "loading" ? (
        <Spinner/>
      ) : (
        <>
          <div className="mx-4 md:mx-10">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y-2 divide-wwlGray200 sm:divide-wwlGreen">
                      <thead className="bg-transparent">
                      <tr>
                        {desktopHeaders.map((item, index) => {
                          return (
                            <th
                              key={index}
                              // onClick={() => updateFilter(item.title)}
                              scope="col"
                              className="bg-wwlWhite cursor-pointer whitespace-nowrap font-chivo pr-3 py-3.5 text-left text-wwlBlack"
                            >
                              <div className="flex items-center max-w-fit">
                                {item.title}
                                {/*                              <span className="flex ml-1">*/}
                                {/*  {item.filterActive ? (*/}
                                {/*      item.filterDirection === "asc" ? (*/}
                                {/*          <ArrowUpIcon className="h-4 w-4"/>*/}
                                {/*      ) : (*/}
                                {/*          <ArrowDownIcon className="h-4 w-4"/>*/}
                                {/*      )*/}
                                {/*  ) : (*/}
                                {/*      <ArrowUpIcon className="h-4 w-4 text-transparent"/>*/}
                                {/*  )}*/}
                                {/*</span>*/}
                              </div>
                            </th>
                          );
                        })}
                        {mobileHeaders.map((item, index) => {
                          return (
                            <th
                              key={index}
                              // onClick={() => updateFilter(item.title)}
                              scope="col"
                              className="hidden sm:table-cell cursor-pointer whitespace-nowrap font-chivo pr-3 py-3.5 text-left text-wwlBlack bg-wwlWhite"
                            >
                              <div className="flex items-center max-w-fit">
                                {item.title}
                                {/*                              <span className="flex ml-1">*/}
                                {/*  {item.filterActive ? (*/}
                                {/*      item.filterDirection === "asc" ? (*/}
                                {/*          <ArrowUpIcon className="h-4 w-4"/>*/}
                                {/*      ) : (*/}
                                {/*          <ArrowDownIcon className="h-4 w-4"/>*/}
                                {/*      )*/}
                                {/*  ) : (*/}
                                {/*      <ArrowUpIcon className="h-4 w-4 text-transparent"/>*/}
                                {/*  )}*/}
                                {/*</span>*/}
                              </div>
                            </th>
                          );
                        })}
                        {visibleOnlyOnMobile.map((item, index) => {
                          return (
                            <th
                              key={index}
                              // onClick={() => updateFilter(item.title)}
                              scope="col"
                              className="sm:hidden cursor-pointer whitespace-nowrap font-chivo pr-3 py-3.5 text-left text-wwlGray500 bg-wwlWhite font-medium text-sm "
                            >
                              <div className="flex items-center max-w-fit cursor-pointer">
                                {item.title}
                                {/*                              <span className="flex ml-1">*/}
                                {/*  {item.filterActive ? (*/}
                                {/*      item.filterDirection === "asc" ? (*/}
                                {/*          <ArrowUpIcon className="h-4 w-4"/>*/}
                                {/*      ) : (*/}
                                {/*          <ArrowDownIcon className="h-4 w-4"/>*/}
                                {/*      )*/}
                                {/*  ) : (*/}
                                {/*      <ArrowUpIcon className="h-4 w-4 text-transparent"/>*/}
                                {/*  )}*/}
                                {/*</span>*/}
                              </div>
                            </th>
                          );
                        })}

                        <th
                          key='Actions'
                          scope="col"
                          className="px-3 py-3.5  whitespace-nowrap hidden sm:block  text-left font-chivo text-wwlBlack bg-wwlWhite sm:pl-6 transition-colors duration-300"
                        >
                          <div className="flex items-center">
                            Actions
                          </div>
                        </th>

                      </tr>
                      </thead>
                      <tbody
                        className="divide-y divide-wwlGray200 sm:divide-wwlGreenTransparent bg-wwlWhite">
                      {items?.map((item, index) => (
                        // Temporary fix for the fact that the API is returning duplicate items
                        <TableRow key={item._id} item={item} index={index} currentTab={currenTab}
                                 totalItems={items.length}/>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            currentPage={Number(paginationDetails.currentPage)}
            totalCount={paginationDetails.totalCount}
            pageSize={PageSize}
            onPageChange={(page) => {
              setSearchParam({page});
            }
            }
          />
        </>
      )}
    </>
  )
    ;
}


export default DataTable;