import {ArrowDownIcon, ArrowUpIcon} from "@heroicons/react/outline";
import React, {useState, useEffect} from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Spinner from "./components/Spinner";
// import { getSortedItems } from "../../redux/recipe/recipesThunk";
// import Pagination from "../Pagination";

export default function ReferenceDataTable({
                                             parentcb,
                                             incrementPage,
                                             decrementPage,
                                             currentItems,
                                             currentPage,
                                             totalPages,
                                             setCurrentPage,
                                             setEditingId,
                                           }) {
  // const dispatch = useDispatch();
  // const adsStatus = useSelector((state) => state.ads.status);
  const adsStatus = 'not loading'

  const [headers, setHeaders] = useState([
    {
      title: "Thumbnail",
      filterDirection: "asc",
      filterActive: false,
    },
    {
      title: "Item ID",
      filterDirection: "asc",
      filterActive: false,
    },
    {
      title: "Brand",
      filterDirection: "asc",
      filterActive: false,
    },
    {
      title: "Product",
      filterDirection: "asc",
      filterActive: false,
    },
    {
      title: "Type",
      filterDirection: "asc",
      filterActive: false,
    },
    {
      title: "Status",
      filterDirection: "asc",
      filterActive: false,
    },
  ]);

  const handleAscDesc = (input) => {
    return input === "asc" ? "desc" : "asc";
  };

  const updateFilter = (title) => {
    let tempHeaders = [...headers];
    for (let i = 0; i < tempHeaders.length; i++) {
      // If we get a match
      if (tempHeaders[i].title === title) {
        // Check current status and act appropriately.
        if (tempHeaders[i].filterActive) {
          tempHeaders[i].filterDirection = handleAscDesc(
            headers[i].filterDirection
          );
        } else {
          tempHeaders[i].filterActive = true;
        }
      }
      // If we are anything but the selected column
      else {
        tempHeaders[i].filterActive = false;
      }
    }

    setHeaders(tempHeaders);
  };

  useEffect(() => {
    let updateObj = {};
    for (let i = 0; i < headers.length; i++) {
      if (headers[i].filterActive) {
        Object.keys(headers[i]).forEach(function (key, index) {
          // key: the name of the object key
          // index: the ordinal position of the key within the object
          updateObj[key] = headers[i][key];
        });
      }
    }

    // also check for search string, so that we can incorporate that
    updateObj["companyName"] = "null";
    updateObj["pageNum"] = currentPage;
    const params = new URLSearchParams(window.location.search);
    const search_one = params.get("search");
    const search_two = params.get("companySearch");
    if (search_one && search_one.length > 0) {
      updateObj["companyName"] = search_one;
    }
    if (search_two && search_two.length > 0) {
      updateObj["companyName"] = search_two;
    }
    // dispatch(getSortedItems(updateObj));
  }, [headers]);

  return (
    <>
      {adsStatus === "loading" ? (
        // <Spinner />
        <div>loading</div>
      ) : (
        <>
          <div className="w-full">
            {/*<div className="sm:flex sm:items-center">*/}
            {/*  <div className="sm:flex-auto">*/}
            {/*    <h1 className="text-xl font-semibold text-gray-900">*/}
            {/*      Manage Items*/}
            {/*    </h1>*/}
            {/*    <p className="mt-2 text-sm text-gray-700"></p>*/}
            {/*  </div>*/}

            {/*  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">*/}
            {/*    <button*/}
            {/*      onClick={() => setEditingId("NEW_AD")}*/}
            {/*      type="button"*/}
            {/*      className="inline-flex items-center justify-center rounded-md border border-transparent bg-hypurp px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-hypurp focus:outline-none focus:ring-2 focus:ring-hypurp focus:ring-offset-2 sm:w-auto"*/}
            {/*    >*/}
            {/*      Add A Item*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                      <tr>
                        {headers.map((item) => {
                          return (
                            <th
                              key={item.title}
                              onClick={() => updateFilter(item.title)}
                              scope="col"
                              className="cursor-pointer px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hover:text-gray-700 sm:pl-6"
                            >
                              <div className="flex items-center">
                                {item.title}
                                <span className="flex ml-1">
                                    {item.filterActive ? (
                                      item.filterDirection === "asc" ? (
                                        <ArrowUpIcon className="h-4 w-4"/>
                                      ) : (
                                        <ArrowDownIcon className="h-4 w-4"/>
                                      )
                                    ) : (
                                      <ArrowUpIcon className="h-4 w-4 text-transparent"/>
                                    )}
                                  </span>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                      {currentItems.map((ad) => (
                        <tr
                          onClick={() => setEditingId(ad._id)}
                          key={ad._id}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="h-16 w-16 bg-gray-300 rounded-md">
                              <img
                                alt="adimg"
                                src={ad.image}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {ad._id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {ad.company}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {ad.product}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {ad.device}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {ad.status}
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<Pagination*/}
          {/*  incrementPage={incrementPage}*/}
          {/*  decrementPage={decrementPage}*/}
          {/*  setCurrentPage={setCurrentPage}*/}
          {/*  currentPage={currentPage}*/}
          {/*  totalPages={totalPages}*/}
          {/*/>*/}
        </>
      )}
    </>
  );
}
